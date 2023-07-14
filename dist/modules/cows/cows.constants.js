"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowsFilterableFields = exports.Category = exports.Label = exports.Breed = exports.Locations = void 0;
var Locations;
(function (Locations) {
    Locations["dhaka"] = "dhaka";
    Locations["chattogram"] = "chattogram";
    Locations["barishal"] = "barishal";
    Locations["rajshahi"] = "rajshahi";
    Locations["sylhet"] = "sylhet";
    Locations["comilla"] = "comilla";
    Locations["rangpur"] = "rangpur";
    Locations["mymensingh"] = "mymensingh";
})(Locations || (exports.Locations = Locations = {}));
var Breed;
(function (Breed) {
    Breed["brahman"] = "brahman";
    Breed["nellore"] = "nellore";
    Breed["sahiwal"] = "sahiwal";
    Breed["gir"] = "gir";
    Breed["indigenous"] = "indigenous";
    Breed["tharparkar"] = "tharparkar";
    Breed["kankrej"] = "kankrej";
})(Breed || (exports.Breed = Breed = {}));
var Label;
(function (Label) {
    Label["for_sale"] = "for_sale";
    Label["sold_out"] = "sold_out";
})(Label || (exports.Label = Label = {}));
var Category;
(function (Category) {
    Category["dairy"] = "dairy";
    Category["beef"] = "beef";
    Category["dual_purpose"] = "dual_purpose";
})(Category || (exports.Category = Category = {}));
exports.cowsFilterableFields = [
    'searchTerm',
    'location',
    'breed',
    'category',
    'minPrice',
    'maxPrice',
];
