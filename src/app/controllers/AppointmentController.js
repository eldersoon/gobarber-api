import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';


class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    const data = appointments;

    if (isBefore(data.date, new Date())) {
      return res.status(400).json({ error: 'User does not have appointment!' })
    }

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fail to validation' });
    }
    /**
     * get providers only
     */
    const { provider_id, date } = req.body;

    const checkIsProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true
      }
    });

    if (!checkIsProvider) {
      return res.status(400).json({ error: 'Invalid provider, choose another one!' });
    }

    if (checkIsProvider.id == req.userId) {
      return res.status(401).json({ error: 'You cant schedules yourself' });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: "It's late to makes an appointment, try current hour!" })
    }

    const checkApointment = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });

    if (checkApointment) {
      return res.status(400).json({ error: 'Appointment date is not available!' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart
    });

    /**
     * Notify provider
     */
    const user = await User.findByPk(req.userId);
    const aptmtDate = format(
      hourStart,
      "'dia' dd 'de' MMMM 'às' H:mm'h' ",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${aptmtDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {

    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        }
      ]
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You dont have perssion to cancel this appointment!"
      });
    }

    if (appointment.canceled_at != null) {
      return res.status(400).json({
        error: 'Appointment already canceled!'
      });
    }

    const limitHour = subHours(appointment.date, 2);

    if (isBefore(limitHour, new Date())) {
      return res.status(401).json({ error: 'You cant cancel your appointment!' });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
