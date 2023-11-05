import Person from "./person.js";
class Student extends Person {
  constructor(id, hoTen, diaChi, email, loaiNguoiDung, toan, ly, hoa) {
    super(id, hoTen, diaChi, email, loaiNguoiDung);
    this.loaiNguoiDung = "Học viên";
    this.toan = toan;
    this.ly = ly;
    this.hoa = hoa;
    this.diemTrungBinh =
      (parseInt(this.toan) + parseInt(this.ly) + parseInt(this.hoa)) / 3;
  }
}
export default Student;
