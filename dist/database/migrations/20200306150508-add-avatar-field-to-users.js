'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  down: function down(queryInterface) {
    return queryInterface.removeColumns('users', 'avatar_id');
  }
};
//# sourceMappingURL=20200306150508-add-avatar-field-to-users.js.map