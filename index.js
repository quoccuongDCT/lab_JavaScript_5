function tinhKetQua() {
    const diemChuan = parseFloat(document.getElementById("diemChuan").value);
    const diem1 = parseFloat(document.getElementById("diem1").value);
    const diem2 = parseFloat(document.getElementById("diem2").value);
    const diem3 = parseFloat(document.getElementById("diem3").value);
    const khuVuc = document.getElementById("khuVuc").value;
    const doiTuong = parseInt(document.getElementById("doiTuong").value);

    if (isNaN(diemChuan) || isNaN(diem1) || isNaN(diem2) || isNaN(diem3)) {
        document.getElementById("ketQuatinh").textContent = "Vui lòng nhập đầy đủ điểm.";
        return;
    }

    let diemKV = 0;
    if (khuVuc === "A") {
        diemKV = 2;
    } else if (khuVuc === "B") {
        diemKV = 1;
    } else if (khuVuc === "C") {
        diemKV = 0.5;
    }

    let diemDT = 0;
    if (doiTuong === 1) {
        diemDT = 2.5;
    } else if (doiTuong === 2) {
        diemDT = 1.5;
    } else if (doiTuong === 3) {
        diemDT = 1;
    }

    const diemUuTien = diemKV + diemDT;

    if (diem1 === 0 || diem2 === 0 || diem3 === 0) {
        document.getElementById("ketQuatinh").textContent = "Rớt vì có môn bị điểm 0.";
        return;
    }

    const tongDiem = diem1 + diem2 + diem3 + diemUuTien;

    const ketQuatinh = tongDiem >= diemChuan ? "ĐẬU" : "RỚT";

    document.getElementById("ketQuatinh").textContent = `Kết quả: ${ketQuatinh} | Tổng điểm: ${tongDiem.toFixed(2)}`;
}

function tinhTienDien() {
    const tenKhach = document.getElementById("tenKhach").value.trim();
    const soKw = parseInt(document.getElementById("soKw").value);

    if (!tenKhach || isNaN(soKw) || soKw < 0) {
        document.getElementById("ketQuaTienDien").textContent = "Vui lòng nhập tên và số Kw hợp lệ.";
        return;
    }

    let tien = 0;
    let kw = soKw;

    if (kw <= 50) {
        tien = kw * 500;
    } else if (kw <= 100) {
        tien = 50 * 500 + (kw - 50) * 650;
    } else if (kw <= 200) {
        tien = 50 * 500 + 50 * 650 + (kw - 100) * 850;
    } else if (kw <= 350) {
        tien = 50 * 500 + 50 * 650 + 100 * 850 + (kw - 200) * 1100;
    } else {
        tien = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (kw - 350) * 1300;
    }

    const ketQuaTienDien = `Khách hàng: ${tenKhach} | Số Kw: ${soKw} | Tiền điện: ${tien.toLocaleString()} VNĐ`;

    document.getElementById("ketQuaTienDien").textContent = ketQuaTienDien;
}

function tinhThue() {
    const hoTen = document.getElementById("hoTen").value.trim();
    const tongThuNhap = parseFloat(document.getElementById("tongThuNhap").value);
    const nguoiPhuThuoc = parseInt(document.getElementById("nguoiPhuThuoc").value);

    if (!hoTen || isNaN(tongThuNhap) || isNaN(nguoiPhuThuoc) || tongThuNhap < 0 || nguoiPhuThuoc < 0) {
        document.getElementById("ketQuaThue").textContent = "Vui lòng nhập đầy đủ và hợp lệ.";
        return;
    }

    const thuNhapChiuThue = tongThuNhap - 4 - nguoiPhuThuoc * 1.6;
    if (thuNhapChiuThue <= 0) {
        document.getElementById("ketQuaThue").textContent = `${hoTen} không phải đóng thuế.`;
        return;
    }

    let thueSuat = 0;
    if (thuNhapChiuThue <= 60) thueSuat = 0.05;
    else if (thuNhapChiuThue <= 120) thueSuat = 0.10;
    else if (thuNhapChiuThue <= 210) thueSuat = 0.15;
    else if (thuNhapChiuThue <= 384) thueSuat = 0.20;
    else if (thuNhapChiuThue <= 624) thueSuat = 0.25;
    else if (thuNhapChiuThue <= 960) thueSuat = 0.30;
    else thueSuat = 0.35;

    const tienThue = thuNhapChiuThue * thueSuat;
    const ketQuaThue = `${hoTen} | Thu nhập chịu thuế: ${thuNhapChiuThue.toFixed(2)} triệu | Thuế phải trả: ${tienThue.toLocaleString()} triệu`;
    document.getElementById("ketQuaThue").textContent = ketQuaThue;
}

function toggleKetNoi() {
    const loai = document.getElementById("loaiKhachHang").value;
    const ketNoiInput = document.getElementById("soKetNoi");
    if (loai === "doanhNghiep") {
        ketNoiInput.classList.remove("hidden");
    } else {
        ketNoiInput.classList.add("hidden");
        ketNoiInput.value = "";
    }
}

function tinhTienCap() {
    const maKH = document.getElementById("maKhachHang").value.trim();
    const loaiKH = document.getElementById("loaiKhachHang").value;
    const soKetNoi = parseInt(document.getElementById("soKetNoi").value);
    const soKenh = parseInt(document.getElementById("soKenh").value);

    if (!maKH || !loaiKH || isNaN(soKenh) || soKenh < 0 || (loaiKH === "doanhNghiep" && (isNaN(soKetNoi) || soKetNoi <= 0))) {
        document.getElementById("ketQuaTienCap").textContent = "Vui lòng nhập đầy đủ và hợp lệ.";
        return;
    }

    let tongTien = 0;

    if (loaiKH === "dan") {
        tongTien = 4.5 + 20.5 + soKenh * 7.5;
    } else {
        let phiDichVu = 75;
        if (soKetNoi > 10) {
            phiDichVu += (soKetNoi - 10) * 5;
        }
        tongTien = 15 + phiDichVu + soKenh * 50;
    }

    document.getElementById("ketQuaTienCap").textContent = `Mã KH: ${maKH} | Tổng tiền cáp: $${tongTien.toFixed(2)}`;
}