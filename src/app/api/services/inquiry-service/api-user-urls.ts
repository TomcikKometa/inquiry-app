export class UserUrls {
  private static readonly INQUIRY_PREFIX: string = '/user/inquiry';

  public static prepareCreateInquiryUrl(): string {
    return `${this.INQUIRY_PREFIX}/save`;
  }
  public static prepareEditInquiryUrl(id:number): string {
    return `${this.INQUIRY_PREFIX}/edit/${id}`;
  }
  public static prepareGetAllInquiryUrl(): string {
    return `${this.INQUIRY_PREFIX}/all`;
  }
}
