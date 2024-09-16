import sequelize from '@/services/database/database'
import { DataTypes, Model } from 'sequelize'

class Role extends Model {
    id!: number
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        last_modified_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false,
    }
)

export default Role
