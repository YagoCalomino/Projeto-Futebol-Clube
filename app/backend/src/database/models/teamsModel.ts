// Importando os módulos necessários do sequelize
import {
  InferAttributes,
  InferCreationAttributes, Model,
  DataTypes,
  CreationOptional } from 'sequelize';

// Importando o módulo de banco de dados
import db from '.';

// Definindo a classe Teams que estende o Model do sequelize
class Teams extends Model <InferAttributes<Teams>, InferCreationAttributes<Teams>> {
  // Declarando as propriedades do modelo
  declare id: CreationOptional<number>;
  declare teamName: string;
}

// Inicializando o modelo Teams com suas propriedades e configurações
Teams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // A chave primária será incrementada automaticamente
    allowNull: false, // Não permite valores nulos
    primaryKey: true, // Define como chave primária
  },
  teamName: {
    type: DataTypes.STRING, // O tipo de dado é uma string
    allowNull: false, // Não permite valores nulos
    field: 'team_name', // O nome do campo na tabela do banco de dados
  },
}, {
  sequelize: db, // Conexão com o banco de dados
  modelName: 'Teams', // Nome do modelo
  tableName: 'teams', // Nome da tabela correspondente no banco de dados
  timestamps: false, // Desativando os timestamps automáticos do sequelize
  underscored: true, // Utilizando o padrão underscored para os nomes das colunas
});

// Exportando o modelo Teams
export default Teams;
