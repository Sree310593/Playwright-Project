class OrdersPage {
    constructor(page) {
        this.orderButton = page.locator("//i[@class='fa fa-handshake-o']");
        this.orderRows = page.locator("tbody tr");
        this.orderIdSummaryPage = page.locator("//div[@class='col-text -main']");
    }

}

module.exports = OrdersPage;
