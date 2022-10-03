import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Injectable()
export class ExportService {

  private saveAsFile(buffer: any, filename: string, filetype: string) {
    const data: Blob = new Blob([buffer],  {type: filetype});
    FileSaver.saveAs(data, filename);
  }

  public exportToCsv(rows: any, fileName: string, columns: string[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = ["first_name", "last_name"];
    console.log(keys)
    const csvContent =
      columns.join(separator) +
      '\n' +
      rows.map((row: any) => {
        return [
          row["student"]["first_name"] ? row["student"]["first_name"] : '',
          row["student"]["last_name"] ? row["student"]["last_name"] : '',
          row["student"]["promotion"] ? row["student"]["promotion"] : '',
          row["student"]["email"] ? row["student"]["email"] : '',
          row["student"]["gender"] ? row["student"]["gender"] : '',
          row["student"]["degree"] ? row["student"]["degree"] : '',
          row["host_company"]["name"] ? row["host_company"]["name"] : '',
          row["host_company"]["city"] ? row["host_company"]["city"] : '',
          row["host_company_job"] ? row["host_company_job"] : '',
          row["actual_company"]["name"] ? row["actual_company"]["name"] : '',
          row["actual_company"]["city"] ? row["actual_company"]["city"] : '',
          row["actual_company_job"] ? row["actual_company_job"] : '',
          row["student"]["linkedin"] ? row["student"]["linkedin"] : ''

        ].join(separator);
      }).join('\n');
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }
}
