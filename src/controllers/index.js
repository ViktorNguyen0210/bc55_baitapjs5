import {
  fetchData,
  addPerson,
  delPerson,
  getPersonByID,
  updatePerson,
} from "../services/callApi.js";
import Employee from "../models/employee.js";
import Student from "../models/student.js";

function getEle(id) {
  return document.getElementById(id);
}
async function getListPersons() {
  try {
    let result = await fetchData();
    renderUI(result.data);
  } catch (error) {
    console.log(error);
  }
}
getListPersons();

function renderUI(data) {
  let content = "";
  content += data
    .map((item) => {
      return `<tr>
      <td>${item.id}</td>
      <td>${item.hoTen}</td>
      <td>${item.email}</td>
      <td>${item.diaChi}</td>
      <td>${item.loaiNguoiDung}</td>
      <td>
        <button id="btnChiTiet" data-id="${item.id}" data-action="ChiTiet" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Chi tiết</button>
        <button id="btnSua" data-id="${item.id}" data-action="Sua" class="btn btn-secondary" data-toggle="modal" data-target="#myModal">Sửa</button>
        <button id="btnXoa" class="btn btn-danger mt-2" data-action="Xoa" data-id="${item.id}">Xóa</button>
        
      </td>
    </tr>`;
    })
    .join("");
  document.getElementById("tableDanhSach").innerHTML = content;
}

// Giảng viên
async function themGV() {
  let id = getEle("maTK").value;
  let ten = getEle("ten").value;
  let email = getEle("email").value;
  let diaChi = getEle("diaChi").value;
  let loaiNguoiDung = getEle("loaiNguoiDung").value;
  let luongTheoNgay = getEle("luongTheoNgay").value;
  let soNgayLamViec = getEle("soNgayLamViec").value;
  let giangVien = new Employee(
    id,
    ten,
    diaChi,
    email,
    loaiNguoiDung,
    soNgayLamViec,
    luongTheoNgay
  );
  try {
    await addPerson(giangVien);
    alert("Thêm giảng viên thành công");
    getEle("btnDong").click();
    getListPersons();
  } catch (error) {
    console.log(error);
  }
}

async function xoaNguoiDung(id) {
  try {
    await delPerson(id);
    alert("Xóa thành công");
    getListPersons();
  } catch (error) {
    console.log(error);
  }
}

async function chiTietGV(id) {
  getEle("btnThem").style.display = "none";
  getEle("btnCapNhat").style.display = "none";
  getEle("formLuong").style.display = "block";
  getEle("formDiemTB").style.display = "none";
  getEle("formDiemTB").style.display = "none";
  getEle("infoHV").style.display = "none";
  getEle("tinhLuong").disabled = true;

  try {
    let gv = await getPersonByID(id);
    getEle("maTK").value = gv.data.id;
    getEle("maTK").disabled = true;
    getEle("ten").value = gv.data.hoTen;
    getEle("email").value = gv.data.email;
    getEle("diaChi").value = gv.data.diaChi;
    getEle("loaiNguoiDung").value = gv.data.loaiNguoiDung;
    getEle("soNgayLamViec").value = gv.data.soNgayLamViec;
    getEle("luongTheoNgay").value = gv.data.luongTheoNgay;
    getEle("tinhLuong").value = gv.data.tongLuong;
  } catch (error) {
    console.log(error);
  }
}

async function suaGV(id) {
  getEle("infoGV").style.display = "block";
  getEle("infoHV").style.display = "none";
  getEle("btnThem").style.display = "none";
  getEle("btnCapNhat").style.display = "block";
  getEle("formDiemTB").style.display = "none";
  getEle("infoHV").style.display = "none";

  getEle("formLuong").style.display = "none";

  try {
    let gv = await getPersonByID(id);
    getEle("maTK").value = gv.data.id;
    getEle("maTK").disabled = true;
    getEle("ten").value = gv.data.hoTen;
    getEle("email").value = gv.data.email;
    getEle("diaChi").value = gv.data.diaChi;
    getEle("loaiNguoiDung").value = gv.data.loaiNguoiDung;
    getEle("loaiNguoiDung").disabled = true;

    getEle("soNgayLamViec").value = gv.data.soNgayLamViec;
    getEle("luongTheoNgay").value = gv.data.luongTheoNgay;
  } catch (error) {
    console.log(error);
  }
}

async function capNhatGV() {
  try {
    let id = getEle("maTK").value;
    let ten = getEle("ten").value;
    let email = getEle("email").value;
    let diaChi = getEle("diaChi").value;
    let loaiNguoiDung = getEle("loaiNguoiDung").value;
    let luongTheoNgay = getEle("luongTheoNgay").value;
    let soNgayLamViec = getEle("soNgayLamViec").value;
    let giangVien = new Employee(
      id,
      ten,
      diaChi,
      email,
      loaiNguoiDung,
      soNgayLamViec,
      luongTheoNgay
    );
    await updatePerson(giangVien);
    alert("Cập nhật giảng viên thành công");
    getEle("btnDong").click();
    getListPersons();
  } catch (error) {
    console.log(error.data);
  }
}

getEle("tableDanhSach").addEventListener("click", function (event) {
  let loai = "";
  loai = getEle("loaiNguoiDung").value;

  const targer = event.target;
  const action = targer.getAttribute("data-action");
  if (action === "Xoa") {
    const id = targer.getAttribute("data-id");
    xoaNguoiDung(id);
  }
  if (action === "Sua") {
    const id = targer.getAttribute("data-id");
    if (loai === "Giảng viên") {
      return suaGV(id);
    }
    return suaHV(id);
  }
  if (action === "ChiTiet") {
    const id = targer.getAttribute("data-id");
    if (loai === "Giảng viên") {
      return chiTietGV(id);
    }
    return chiTietHV(id);
  }
});
getEle("btnCapNhat").addEventListener("click", function () {
  capNhatGV();
});

getEle("btnThemGV").addEventListener("click", function () {
  resetInputGVFields();
  getEle("maTK").disabled = true;
  getEle("infoGV").style.display = "block";
  getEle("infoHV").style.display = "none";
  getEle("btnThem").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
  getEle("formLuong").style.display = "none";
  getEle("btnThem").onclick = themGV;
  getEle("loaiNguoiDung").value = "Giảng viên";
  getEle("loaiNguoiDung").disabled = true;
});
getEle("btnThemHV").addEventListener("click", function () {
  resetInputHVFields();
  getEle("maTK").disabled = true;
  getEle("infoGV").style.display = "none";
  getEle("infoHV").style.display = "block";
  getEle("btnThem").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
  getEle("formDiemTB").style.display = "none";
  getEle("btnThem").onclick = themHV;
  getEle("loaiNguoiDung").value = "Học viên";
  getEle("loaiNguoiDung").disabled = true;

  // getEle("formLuong").style.display = "none";
});

function resetInputGVFields() {
  getEle("maTK").value = "";
  getEle("ten").value = "";
  getEle("email").value = "";
  getEle("diaChi").value = "";
  getEle("loaiNguoiDung").value = "";
  getEle("soNgayLamViec").value = "";
  getEle("luongTheoNgay").value = "";
  getEle("tinhLuong").value = "";
}

// HỌC VIÊN

function resetInputHVFields() {
  getEle("maTK").value = "";
  getEle("ten").value = "";
  getEle("email").value = "";
  getEle("diaChi").value = "";
  getEle("loaiNguoiDung").value = "";
  getEle("toan").value = "";
  getEle("ly").value = "";
  getEle("hoa").value = "";
  getEle("diemTB").value = "";
}
async function themHV() {
  let id = getEle("maTK").value;
  getEle("maTK").disabled = true;
  let ten = getEle("ten").value;
  let email = getEle("email").value;
  let diaChi = getEle("diaChi").value;
  let loaiNguoiDung = getEle("loaiNguoiDung").value;
  let toan = getEle("toan").value;
  let ly = getEle("ly").value;
  let hoa = getEle("hoa").value;

  let hocVien = new Student(
    id,
    ten,
    diaChi,
    email,
    loaiNguoiDung,
    toan,
    ly,
    hoa
  );
  try {
    await addPerson(hocVien);
    alert("Thêm học viên thành công");
    getEle("btnDong").click();
    getListPersons();
  } catch (error) {
    console.log(error);
  }
}

async function chiTietHV(id) {
  getEle("btnThem").style.display = "none";
  getEle("btnCapNhat").style.display = "none";
  getEle("formLuong").style.display = "none";
  getEle("infoGV").style.display = "none";
  getEle("formDiemTB").style.display = "block";
  getEle("diemTB").disabled = true;

  try {
    let hv = await getPersonByID(id);
    getEle("maTK").value = hv.data.id;
    getEle("maTK").disabled = true;
    getEle("ten").value = hv.data.hoTen;
    getEle("email").value = hv.data.email;
    getEle("diaChi").value = hv.data.diaChi;
    getEle("loaiNguoiDung").value = hv.data.loaiNguoiDung;
    getEle("toan").value = hv.data.toan;
    getEle("ly").value = hv.data.ly;
    getEle("hoa").value = hv.data.hoa;

    getEle("diemTB").value = hv.data.diemTrungBinh;
  } catch (error) {
    console.log(error);
  }
}

async function suaHV(id) {
  getEle("infoGV").style.display = "none";
  getEle("infoHV").style.display = "block";
  getEle("btnThem").style.display = "none";
  getEle("btnCapNhat").style.display = "block";
  getEle("formDiemTB").style.display = "none";

  try {
    let hv = await getPersonByID(id);
    getEle("maTK").value = hv.data.id;
    getEle("maTK").disabled = true;
    getEle("ten").value = hv.data.hoTen;
    getEle("email").value = hv.data.email;
    getEle("diaChi").value = hv.data.diaChi;
    getEle("loaiNguoiDung").value = hv.data.loaiNguoiDung;
    getEle("loaiNguoiDung").disabled = true;

    getEle("toan").value = hv.data.toan;
    getEle("ly").value = hv.data.ly;
    getEle("hoa").value = hv.data.hoa;
  } catch (error) {
    console.log(error);
  }
}

async function capNhatHV() {
  try {
    let id = getEle("maTK").value;
    let ten = getEle("ten").value;
    let email = getEle("email").value;
    let diaChi = getEle("diaChi").value;
    let loaiNguoiDung = getEle("loaiNguoiDung").value;
    let toan = getEle("toan").value;
    let ly = getEle("ly").value;
    let hoa = getEle("hoa").value;

    let hv = new Student(id, ten, diaChi, email, loaiNguoiDung, toan, ly, hoa);
    await updatePerson(hv);
    alert("Cập nhật học viên thành công");
    getEle("btnDong").click();
    getListPersons();
  } catch (error) {
    console.log(error.data);
  }
}
