import sequelize from '@/services/database/database'
import { DataTypes, Model } from 'sequelize'

class Owner extends Model {
    public id!: string
}

Owner.init(
    {
        id: {
            type: DataTypes.STRING(12),
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
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
        tax_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        verification_code: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        status: {
            type: DataTypes.TINYINT,
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
        modelName: 'Owner',
        tableName: 'owners',
        timestamps: false,
    }
)

export default Owner