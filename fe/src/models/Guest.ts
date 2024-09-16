import sequelize from '@/services/database/database'
import { DataTypes, Model } from 'sequelize'

class Guest extends Model {
    public id!: string
}

Guest.init(
    {
        id: {
            type: DataTypes.STRING(12),
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        verification_code: {
            type: DataTypes.STRING(6),
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
        modelName: 'Guest',
        tableName: 'guests',
        timestamps: false,
    }
)

export default Guest
