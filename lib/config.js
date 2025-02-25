"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = exports.githubToken = exports.deleteOldComment = exports.recreate = exports.append = exports.header = exports.repo = exports.pullRequestNumber = void 0;
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const fs_1 = require("fs");
exports.pullRequestNumber = ((_b = (_a = github_1.context === null || github_1.context === void 0 ? void 0 : github_1.context.payload) === null || _a === void 0 ? void 0 : _a.pull_request) === null || _b === void 0 ? void 0 : _b.number) ||
    +core.getInput('number', { required: false });
exports.repo = buildRepo();
exports.header = core.getInput('header', { required: false });
exports.append = core.getInput('append', { required: true }) === 'true';
exports.recreate = core.getInput('recreate', { required: true }) === 'true';
exports.deleteOldComment = core.getInput('delete', { required: true }) === 'true';
exports.githubToken = core.getInput('GITHUB_TOKEN', { required: true });
exports.body = buildBody();
function buildRepo() {
    return {
        owner: github_1.context.repo.owner,
        repo: core.getInput('repo', { required: false }) || github_1.context.repo.repo
    };
}
function buildBody() {
    const path = core.getInput('path', { required: false });
    if (path) {
        try {
            return fs_1.readFileSync(path, 'utf-8');
        }
        catch (error) {
            core.setFailed(error.message);
            return '';
        }
    }
    else {
        return core.getInput('message', { required: false });
    }
}
