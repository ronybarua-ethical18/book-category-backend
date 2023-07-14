"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const cows_model_1 = require("./cows.model");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const cows_constants_1 = require("./cows.constants");
// create a new cow
const createCow = (cowInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cows_model_1.Cow.create(cowInfo);
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow data creation failed');
    }
    return cow;
});
// get all cows from db
const getAllCows = (filterableFields, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = filterableFields || {}, { searchTerm } = _a, filtersData = __rest(_a, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cows_constants_1.cowsFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        const minPrice = filtersData.minPrice;
        const maxPrice = filtersData.maxPrice;
        if (minPrice && maxPrice) {
            andConditions.push({
                price: { $gte: minPrice, $lte: maxPrice },
            });
        }
        else if (minPrice && !maxPrice) {
            andConditions.push({ price: { $gte: minPrice } });
        }
        else if (maxPrice && !minPrice) {
            andConditions.push({ price: { $lte: maxPrice } });
        }
        else {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }
    }
    const conditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const cows = yield cows_model_1.Cow.find(conditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit || 10);
    const total = yield cows_model_1.Cow.countDocuments(conditions);
    const meta = { page, limit, total };
    return {
        meta: meta,
        data: cows || [],
    };
});
// get a single cow
const getSingleCow = (cowId) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cows_model_1.Cow.findById({ _id: cowId });
    if (cow) {
        return cow;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
});
// update a single cow
const updateCow = (cowId, requestPayload, updatePayload) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cows_model_1.Cow.findById({ _id: cowId, seller: requestPayload === null || requestPayload === void 0 ? void 0 : requestPayload.userId });
    if (cow) {
        const updatedCow = yield cows_model_1.Cow.findByIdAndUpdate({ _id: cowId }, Object.assign({}, updatePayload), { new: true });
        return updatedCow;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
});
// delete a single cow
const deleteCow = (cowId) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cows_model_1.Cow.findById({ _id: cowId });
    if (cow) {
        const deletedCow = yield cows_model_1.Cow.findByIdAndDelete({ _id: cowId });
        return deletedCow;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found');
    }
});
exports.default = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
