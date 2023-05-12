"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceOfCompanies = void 0;
const CarJump_1 = require("./CarJump");
const Disney_1 = require("./Disney");
const GameSys_1 = require("./GameSys");
const Kabam_1 = require("./Kabam");
const King_1 = require("./King");
const PlayStudios_1 = require("./PlayStudios");
const Playtika_1 = require("./Playtika");
const Twitter_1 = require("./Twitter");
exports.performanceOfCompanies = [
    ...GameSys_1.GameSys.map((company) => (Object.assign(Object.assign({}, company), { company: 'GameSys' }))),
    ...Playtika_1.Playtika.map((company) => (Object.assign(Object.assign({}, company), { company: 'Playtika' }))),
    ...Disney_1.Disney.map((company) => (Object.assign(Object.assign({}, company), { company: 'Disney' }))),
    ...Twitter_1.Twitter.map((company) => (Object.assign(Object.assign({}, company), { company: 'Twitter' }))),
    ...King_1.King.map((company) => (Object.assign(Object.assign({}, company), { company: 'King' }))),
    ...Kabam_1.Kabam.map((company) => (Object.assign(Object.assign({}, company), { company: 'Kabam' }))),
    ...CarJump_1.CarJump.map((company) => (Object.assign(Object.assign({}, company), { company: 'CarJump' }))),
    ...PlayStudios_1.PlayStudios.map((company) => (Object.assign(Object.assign({}, company), { company: 'PlayStudios' }))),
];
//# sourceMappingURL=index.js.map