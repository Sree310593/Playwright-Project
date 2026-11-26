const path = require('node:path');
const fs = require('node:fs/promises');
const { expect } = require('@playwright/test');

class Invoice {
    constructor(page) {
        this.page = page;
    }

    async downloadInvoice(outputPath = 'downloads/invoice.txt') {
        // Register the listener first so the click-triggered download is not missed.
        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByText('Download Invoice').click();
        const download = await downloadPromise;
        await download.saveAs(outputPath);
        return {
            fileName: path.basename(outputPath),
            filePath: path.resolve(outputPath)
        };
    }

    async openInvoice(filePath) {
        // Read the saved invoice into a string for content validation.
        return await fs.readFile(filePath, 'utf8');
    }

    async verifyInvoiceTotal(invoiceText, expectedTotal) {
        // Extract and compare the numeric amount rather than relying on substring text.
        const match = invoiceText.match(/total purchase amount is\s+(\d+(?:\.\d+)?)/i);
        expect(match, 'Invoice total should exist').not.toBeNull();

        const actualTotal = Number(match[1]);
        expect(actualTotal).toBe(expectedTotal);
        console.log(`Invoice total ${actualTotal} matches expected total ${expectedTotal}`);
    }
}

module.exports = Invoice;