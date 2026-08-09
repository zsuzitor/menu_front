import { FinancialAssistantAppPortfolioEventsRoute, FinancialAssistantAppPortfolioListRoute, FinancialAssistantAppPortfolioRoute, FinancialAssistantAppRoute, FinancialAssistantAppStockListRoute, FinancialAssistantAppStockRoute } from "../Consts";

export default class RouteBuilder {
    //можно сделать полноценный билдер через withApproute.withProject но как будто смысла особо нет
    AppUrl(): string {
        return `/${FinancialAssistantAppRoute}/`;
    }
    PortfolioUrl(portfolioId: number): string {
        return `/${FinancialAssistantAppRoute}/${FinancialAssistantAppPortfolioRoute}${portfolioId}`;
    }
    PortfolioHistoryUrl(portfolioId: number): string {
        return `/${FinancialAssistantAppRoute}/${FinancialAssistantAppPortfolioRoute}${portfolioId}/${FinancialAssistantAppPortfolioEventsRoute}`;
    }
    StockDetailUrl(stockId: number): string {
        return `/${FinancialAssistantAppRoute}/${FinancialAssistantAppStockRoute}${stockId}`;
    }

    PortfolioListUrl(): string {
        return `/${FinancialAssistantAppRoute}/${FinancialAssistantAppPortfolioListRoute}/`;
    }
    StockListUrl(): string {
        return `/${FinancialAssistantAppRoute}/${FinancialAssistantAppStockListRoute}/`;
    }
}

