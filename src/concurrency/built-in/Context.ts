
import * as puppeteer from 'puppeteer';
import { newInjectedPage } from 'fingerprint-injector';

import { ResourceData } from '../ConcurrencyImplementation';
import SingleBrowserImplementation from '../SingleBrowserImplementation';

export default class Context extends SingleBrowserImplementation {

    protected async createResources(): Promise<ResourceData> {
        const context = await (this.browser as puppeteer.Browser)
            .createIncognitoBrowserContext();
        const page = await newInjectedPage(this.browser as puppeteer.Browser, {
            // constraints for the generated fingerprint
            fingerprintOptions: {
                devices: ["mobile"],
                operatingSystems: ["ios"],
            },
        }),
        return {
            context,
            page,
        };
    }

    protected async freeResources(resources: ResourceData): Promise<void> {
        await resources.context.close();
    }

}
