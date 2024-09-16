import sequelize from '@/services/database/database'
import { DataTypes, Model } from 'sequelize'

class AdminRole extends Model {
    id!: number
}

AdminRole.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        admin_id: {
            type: DataTypes.STRING(12),
            references: {
                model: 'Admin',
                key: 'id',
            },
            allowNull: false,
        },
        role_id: {
            type: DataTypes.STRING(12),
            references: {
                model: 'Role',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'AdminRole',
        tableName: 'admin_roles',
        timestamps: false,
    }
)

export default AdminRole
