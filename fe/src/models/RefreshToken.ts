import sequelize from '@/services/database/database'
import { DataTypes, Model } from 'sequelize'

class RefreshToken extends Model {
    public id!: number
    public token!: string
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'refresh_tokens',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

RefreshToken.sync()

export default RefreshToken
