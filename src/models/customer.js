class Customer extends Person {
  constructor(
    id,
    hoTen,
    diaChi,
    email,
    loaiNguoiDung,
    tenCongTy,
    triGiaHoaDon,
    danhGia
  ) {
    super(id, hoTen, diaChi, email, loaiNguoiDung);
    this.tenCongTy = tenCongTy;
    this.triGiaHoaDon = triGiaHoaDon;
    this.danhGia = danhGia;
  }
}
