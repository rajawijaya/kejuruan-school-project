import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.split(' ').length >= 2;
      },
      message: 'Nama harus memiliki minimal 2 kata'
    }
  },
  userName: {
    type: String,
    default: function() {
      const emailParts = this.email.split('@');
      return emailParts[0];
    },
    unique: true,
    lowercase: true,
    validate: [
      {
        validator: (value) => {
          return /^[a-zA-Z0-9_-]+$/.test(value);
        },
        message: 'Karakter yang diperbolehkan untuk username adalah a-z, A-Z, 0-9, -, dan _'
      },
      {
        validator: (value) => {
          return mongoose
            .model('User')
            .findOne({ username: value })
            .then((user) => !user);
        },
        message: (props) => `${props.value} sudah digunakan, silakan pilih yang lain!`,
      }
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: (value) => {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: (props) => `${props.value} bukanlah format email yang benar, mohon masukan format email yang benar!`
      },
      {
        validator: (value) => {
          return mongoose
            .model('User')
            .findOne({ email: value })
            .then((user) => !user);
        },
        message: (props) => `${props.value} sudah digunakan, silakan pilih yang lain!`,
      }
    ]
  },
  password: {
    type: String,
    required: true,
    match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!.])(?!.*\s).{8,}$/, 'password harus memiliki setidaknya 1 huruf kapital A-Z, 1 huruf kecil a-z, 1 angka 0-9, dan 1 simbol @#$%^&+=!.']
  },
  imageUrl: {
    type: String,
    default: null
  },
  birthday: {
    type: String,
    required: true,
    match: [/^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s([1-9]|[1-2][0-9]|3[0-1])\s(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember)\s\d{4}$/, 'Format tanggal salah. Format yang diperbolehkan adalah "Rabu, 31 Mei 2006".']
  },
  role: {
    type: String,
    enum: ["siswa", "guru", "admin"],
    default: "siswa"
  },
}, {
  timestamps: true,
  collection: "UserData"
})

const User = mongoose.model("User", userSchema)

export default User