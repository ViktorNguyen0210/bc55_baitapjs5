import Person from "./person.js";

class Employee extends Person {
  constructor(
    id,
    hoTen,
    diaChi,
    email,
    loaiNguoiDung,
    soNgayLamViec,
    luongTheoNgay
  ) {
    super(id, hoTen, diaChi, email, loaiNguoiDung);
    this.loaiNguoiDung = "Giảng viên";
    this.soNgayLamViec = soNgayLamViec;
    this.luongTheoNgay = luongTheoNgay;
    this.tongLuong = this.soNgayLamViec * this.luongTheoNgay;
  }
}
export default Employee;
