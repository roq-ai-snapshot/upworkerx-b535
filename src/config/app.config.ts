interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Freelancer'],
  tenantRoles: ['Business Owner'],
  tenantName: 'Company',
  applicationName: 'UpworkerX',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
