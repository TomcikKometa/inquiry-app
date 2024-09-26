export class PollsterUrls {
  private static readonly INQUIRY_PREFIX: string = '/pollster/inquiry';

  public static prepareCreateInquiryUrl(): string {
    return `${this.INQUIRY_PREFIX}/save`;
  }
  public static prepareDeleteInquiryUrl(id: number): string {
    return `${this.INQUIRY_PREFIX}/delete/${id}`;
  }
  public static prepareGetInquryByIdUrl(id: number): string {
    return `${this.INQUIRY_PREFIX}/${id}`;
  }
  public static prepareEditInquiryUrl(id:number): string {
    return `${this.INQUIRY_PREFIX}/edit/${id}`;
  }
  public static prepareGetAllInquiryUrl(): string {
    return `${this.INQUIRY_PREFIX}/all`;
  }
}
