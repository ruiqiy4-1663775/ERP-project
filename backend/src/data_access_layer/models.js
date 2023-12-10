import sequelize from "./sequelize.js";
import { Model, DataTypes } from "sequelize";

export class Supplier extends Model {}
Supplier.init({
    supplier_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplier_address_line1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplier_address_line2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    supplier_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplier_state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplier_zipcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    supplier_country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact_primary_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_secondary_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    NOTE: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Supplier',
    tableName: 'Suppliers'
  });
  