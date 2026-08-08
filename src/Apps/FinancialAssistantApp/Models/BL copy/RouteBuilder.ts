import { FinancialAssistantAppPortfolioRoute, FinancialAssistantAppRoute } from "../Consts";

export default class RouteBuilder {
    //можно сделать полноценный билдер через withApproute.withProject но как будто смысла особо нет
    AppUrl(): string {
        return `/${FinancialAssistantAppRoute}/`;
    }
    PortfolioUrl(portfolioId: number): string {
        return `/${FinancialAssistantAppRoute}/${FinancialAssistantAppPortfolioRoute}${portfolioId}`;
    }


}

