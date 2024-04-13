import { Schema } from "mongoose";

interface StatisticsModelTypes {
    ongoing: number;
    completed: number;
    deleted: number;
    total: number;
}

const StatisticsSchema = new Schema<StatisticsModelTypes>({
    ongoing: {type: Number, required: true},
    completed: {type: Number, required: true},
    deleted: {type: Number, required: true},
    total: {type: Number, required: true},
});