export class ApiUrls {
  private static readonly INQUIRY_PREFIX: string = '/inquiry';

  public static prepareCreateInquiryUrl(): string {
    return `${this.INQUIRY_PREFIX}/save`;
  }
  public static prepareDeleteInquiryUrl(id: number): string {
    return `${this.INQUIRY_PREFIX}/delete/${id}`;
  }
  public static prepareGetInquryByIdUrl(id: number): string {
    return `${this.INQUIRY_PREFIX}/${id}`;
  }
  public static prepareGetAllInquiryUrl(): string {
    return `${this.INQUIRY_PREFIX}/all`;
  }
}
