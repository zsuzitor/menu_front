import { Portfolio } from "./Portfolio";
import { Stock } from "./Stock";
import { StockElement } from "./StockElement";

export class FinancialAssistantApp {
    PortfolioList: Portfolio[];
    StockList: Stock[];

    CurrentStockId: number;
    CurrentStock: Stock | null;

    CurrentPortfolioId: number;
    CurrentPortfolio: Portfolio | null;
    CurrentPortfolioElements: StockElement[];

    constructor() {
        this.PortfolioList = [];
        this.StockList = [];
        this.CurrentStockId = -1;
        this.CurrentPortfolioId = -1;
        this.CurrentStock = null;
        this.CurrentPortfolioElements = [];
        this.CurrentPortfolio = null;
    }



}
