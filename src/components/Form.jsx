import { useState } from "react";
import { v4 } from 'uuid'
import UserList from "./UserTable";

const Form = () => {
    const [formData,setFormData] = useState({
        name: "",
        surname: "",
        birthday: "",
        password: "",
    });

    
    const [passwordError, setPasswordError] = useState(null)
    const [nameError, setNameError] = useState(null)
    const [users, setUsers] = useState([])

    // form gönderildiğinde çalışacak fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault();

    // formda boş veri olup olmadığının kontrolü
    if(!formData.name || !formData.surname || !formData.birthday || !formData.password) {
        alert("Lütfen formu doldurunuz...")
        return;
    }

    // kullanıcıya id ekle ve diğer kullanıcılar arasına gönder
    const newUser = {...formData, id: v4()};

    setUsers([...users, newUser]);
};
    console.log(users)

    // şifrenin değişimini izler
    const handlePasswordChange = (e) => {
        // gelen şifre
        const value = e.target.value;

        // state'i güncelleme
        setFormData({...formData, password: value});

        // şifre en az 8 karakterden oluşmalıdır
        if(value.length <= 8 ){
            // 8 karakterden az ise hatayı state'e gönder
            setPasswordError("Şifre en az 8 karakter içermelidir.")
        } else {
            // fazla ise state'i temizler
            setPasswordError(null);
        }

    };

    // ismin değişimini izler
    const handleNameChange = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-z]+$/;

        setFormData({ ...formData, name: value })

        // eğer inputtaki yazı kuraldan geçmezse
        if(!value.match(regex)){
            setNameError("İsim yalnızca harf içermelidir.")
        } else{
            setNameError(null);
        }
    };

    return(
        <div className="p-4">
            <h1><i class="fa-regular fa-pen-to-square"></i> Form Yönetimi</h1>
            <hr />
            <p>Aşağıdaki formu doldurunuz.</p>

            <form onSubmit={handleSubmit} className="my-4">
                <label>İsim:</label>
                <input 
                className="form-control" 
                type="text" 
                onChange={handleNameChange} />
                {nameError && <div className="alert alert-danger mt-2">{nameError}</div>}
                <br />
                <br />
                <label>Soyisim:</label>
                <input 
                className="form-control" 
                type="text"
                onChange={(e) => setFormData({...formData, surname: e.target.value})} 
                />
                <br />
                <br />
                <label>Doğum Tarihi:</label>
                <input 
                className="form-control" 
                type="date"
                onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                 />
                <br />
                <br />
                <label>Şifre:</label>
                <input 
                className="form-control" 
                type="password"
                onChange={(e) => handlePasswordChange(e)}
                />
                
                {/* Şifrede hata varsa uyarı şeklinde gösterir */}
                {passwordError && <div className="alert alert-danger mt-2">{passwordError}</div>}

                <button className="btn btn-secondary my-4">Gönder</button>
            </form>
            {/* KULLANICI LİSTESİ */}
            <UserList users={users} setUsers={setUsers}/>
        </div>
    )
}

export default Form;