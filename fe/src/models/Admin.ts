import sequelize from '@/services/database/database'
import { DataTypes, Model } from 'sequelize'
import Role from './Role'
import AdminRole from './AdminRole'

class Admin extends Model {
    public id!: string
}

Admin.init(
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
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
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
        modelName: 'Admin',
        tableName: 'admins',
        timestamps: false,
    }
)

Admin.belongsToMany(Role, { through: AdminRole, foreignKey: 'admin_id' })
Role.belongsToMany(Admin, { through: AdminRole, foreignKey: 'role_id' })

export default Admin
