import { StockEventEnum } from "./Enum/StockEventEnum";
import { Portfolio } from "./Portfolio";
import { Stock } from "./Stock";
import { StockElement } from "./StockElement";
import { StockEvent } from "./StockEvent";
import { StockHistory } from "./StockHistory";

export class FinancialAssistantApp {
    PortfolioList: Portfolio[];
    StockList: Stock[];

    CurrentStockId: number;
    CurrentStock: Stock | null;
    CurrentStockHistory: StockHistory[];



    CurrentPortfolioId: number;
    CurrentPortfolio: Portfolio | null;
    CurrentPortfolioElements: StockElement[];

    CurrentPortfolioEvents: StockEvent[];
    CurrentPortfolioEventsPage: number;//текущая страница
    CurrentPortfolioEventsTotal: number;//всего штук
    CurrentPortfolioEventsTypeFilter: StockEventEnum | null;


    constructor() {
        this.PortfolioList = [];
        this.StockList = [];
        this.CurrentStockId = -1;
        this.CurrentPortfolioId = -1;
        this.CurrentStock = null;
        this.CurrentPortfolioElements = [];
        this.CurrentPortfolio = null;
        this.CurrentPortfolioEvents = [];
        this.CurrentStockHistory = [];
        this.CurrentPortfolioEventsPage = 1;
        this.CurrentPortfolioEventsTotal = -1;
        this.CurrentPortfolioEventsTypeFilter = null;
    }



}
