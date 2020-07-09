const axios = require('axios');
const dataLevel2 = [
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SRI MARIANA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085221803585',
    },
    keluarga: {
      nama: {
        lengkap: 'AYAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b5cdaa72650028a583db' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'LINDA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082128086834',
    },
    keluarga: {
      nama: {
        lengkap: 'AYAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b5cdaa72650028a583db' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'RIKA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085220163199',
    },
    keluarga: {
      nama: {
        lengkap: 'AYAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b5cdaa72650028a583db' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SOVIA MTS ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081563983272',
    },
    keluarga: {
      nama: {
        lengkap: 'AYAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'MIA RENCONG ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089657258756',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'AIRA HOLIS',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089695785355',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DESY JAKARTA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082110638525',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'YULI SSG ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083807122731',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'PUSPA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085221112407',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DEVI YULYANTI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085320696431',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DITA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089624583607',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'MA FARREL',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089625824881',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'BU SRI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083877077074',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'BU ESTY',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089652719969',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ASRI TAS ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085352051554',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'WIDA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ANISAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082321276649',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'MELANI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081324339484',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'AMBU SHAFIQ ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089658809048',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ASTI UNINUS ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081324367991',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'YAYAH CIAMIS ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081320228311',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DEWI CIMAHI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081214737091',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'BUNA QIANA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081282841757',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'BU BIDAN FITRI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '088229244354',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'RAHMA CICADAS ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '087722832328',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02be5daa72650028a583ef' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SRI MULYANI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082120562006',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SANTI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '0895355580587',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'RISMA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085974941213',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'LIA AMALIA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081564984962',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ELIS ATIN ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '0895357355934',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NENGSIH ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089657471737',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'MIRA ANDRIYANA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '0895343878784',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NOVI NURBAETI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083822011002',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'EUIS ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '0895329123166',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DEWI YULIAWATI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083829214096',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c9c1aa72650028a5842a' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'IKA RAJAMANDALA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089663484979',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'RINI SUKABUMI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '08562253846',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'LEUIS ROSTIKA TASIK ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085221699575',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ANI PANGALENGAN ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081214205268',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SARI JATI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '08990049295',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'TINA CIKALONG ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083821063394',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'VITA BANDUNG ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '0895356330990',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'T DEDE BANDUNG ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '088220363734',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NURUL RANCAEKEK',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '08983112156',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bd16aa72650028a583e9' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DESY GALINDO ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082129364682',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c5efaa72650028a58410' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ANI CITRA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089673711948',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c5efaa72650028a58410' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DESY DANARMAS ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '0895344167874',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c5efaa72650028a58410' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'AI CARDINAL ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083862609844',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c5efaa72650028a58410' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'LENA RANCAKASIAT ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082240191367',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c5efaa72650028a58410' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'YUNI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085974565800',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c733aa72650028a58417' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DENA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081807214044',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c733aa72650028a58417' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'TETI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081323749755',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c733aa72650028a58417' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ATY',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '095346914207',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c733aa72650028a58417' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'RISKA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081221008661',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c733aa72650028a58417' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'GEMPI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085730122301',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c733aa72650028a58417' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NENG SUSI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '0895327197085',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c758aa72650028a58418' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NURIKA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089654931145',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c758aa72650028a58418' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'IIS NURJANAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083104930572',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c758aa72650028a58418' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'BU MARYAM',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c758aa72650028a58418' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'BU RINI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02c758aa72650028a58418' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'TIK TIK ROSTIKA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085659517080',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SITI MARIA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '08578150557',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'MARIANA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '087720223879',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NOVIYANTI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085224558127',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NENDEN NURJANAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089662051874',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'FITRI AISYAH',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081023664609',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SITI NURANI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '087834723500',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SRI YULIANI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '088218703807',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'AI SUMIRAH ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089646447461',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'NUNUNG LAELASARI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081219051789',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'KARYATI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082117958058',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02b7ceaa72650028a583df' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'KOKOM KOMALAWATI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082311537438',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bcdbaa72650028a583e8' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'LISNA SUSANTI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081296139692',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bcdbaa72650028a583e8' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'HENI HERMAWATI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '088218588562',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bcdbaa72650028a583e8' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'AYUNINGTIAS DEWI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081224433272',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bcdbaa72650028a583e8' },
    level: 2,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'HAYU HANIFAH RAHMAWATI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '083195551159',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f02bcdbaa72650028a583e8' },
    level: 2,
  },
];
const dataLevel3 = [
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'TEH PAPAT',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '089696087694',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa409345' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'HAJI LILIH ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '082216300999',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa409345' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'DEAN',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '087833725818',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa409345' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'TEH NENA ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081949557219',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa409345' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'UDEW',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081321537972',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa409345' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'TITA PUSPITAWATI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085222384232',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa40933d' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'SRI WAHYUNI ',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '085322001282',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa40933d' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ROYATI',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '08986408945',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa40933d' },
    level: 3,
  },
  {
    status: 'aktif',
    diri: {
      nama: {
        lengkap: 'ICHA',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '081222515718',
    },
    keluarga: {
      nama: {
        lengkap: '-',
        panggilan: '',
      },
      alamat: {
        jalan: '',
        rt: '',
        rw: '',
        kelurahan: '',
        kecamatan: '',
        kabKota: '',
      },
      lahir: {
        tempat: '',
        tanggal: null,
      },
      pekerjaan: '',
      noTlp: '',
    },
    topAgen: { id: '5f06797751bf4270fa40933e' },
    level: 3,
  },
];

async function exec() {
  for (const agen of dataLevel3) {
    console.log(`Insert agen ${agen.diri.nama.lengkap}`);
    try {
      await axios.post('http://localhost:3001/api/agen', agen, {
        timeout: 30000,
      });
    } catch (e) {
      console.error(e.response.data);
      break;
    }
  }
}

exec();
