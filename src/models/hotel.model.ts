import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';

export interface HotelAttributes {
    id: number;
    site: string;
    hotelName: string;
    startDate: Date;
    endDate: Date;
    price: number;
    searchTime: Date;
}

export type HotelDataPK = "id";
export type HotelDataId = HotelData[HotelDataPK];
export type HotelDataOptionalAttributes = 'id' | 'site' | 'hotelName' | 'startDate' | 'endDate' | 'price' | 'searchTime';
export type startDataCreationAttributes = Optional<HotelAttributes, HotelDataOptionalAttributes>;

export class HotelData extends Model<HotelAttributes, startDataCreationAttributes> implements HotelAttributes {
    public id!: number; //autoinrease
    public site!: string; //req.param
    public hotelName!: string;//req.body.hotelName
    public startDate!: Date;//req.body.startDate
    public endDate!: Date;//req.body.endDate
    public price!: number;//response.result.price
    public searchTime!: Date;//?

    public static initModel(sequelize: Sequelize): typeof HotelData {
        return HotelData.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                site: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                hotelName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                startDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                endDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.NUMBER,
                    allowNull: false,
                },
                searchTime: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'SerachedHotelData',
                timestamps: false,
            }
        );
    }
}

export default HotelData;
