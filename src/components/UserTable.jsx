import { useState } from "react";

const UserList = (props) => {
    // açılır pencerenin gösterilme durumunu tutma
    const [showPopup, setShowPopup] = useState(false);

    // silinecek elemanın id değeri
    const [deletingId, setDeletingId ] = useState(null);

    // Sil butonuna tıklanınca çalışır
    const handleDelete = (id) => {
        // id'si gelen elemanı kaldır
        const filtred = props.users.filter((user) => user.id !== id);

        // Form.jsx'deki state'i güncelle
        props.setUsers(filtred);

        // popup'ı kapat
        setShowPopup(false)
    };

    // popup ekrana yansıtma
    const handlePopup = (id) => {
        // id değerine modalın erişmesi için state'e aktarma
        setDeletingId(id);
        // popup göster
        setShowPopup(true);
    }

    // listenin boş olduğunu belirtme
    if(props.users.length === 0) return "Kullanıcı Listeniz Boş."

    return(
        <table className="table bordered striped">
            <thead>
                <tr>
                    <th>Sıra</th>
                    <th>İsim</th>
                    <th>Soyisim</th>
                    <th>Doğum Tarihi</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((user, i) => (
                    <tr>
                        <td>{i}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.birthday}</td>
                        <td>
                            <button className="btn btn-danger" 
                            onClick={() => handlePopup(user.id)}>Sil</button>
                        </td>
                    </tr>
                ))}
            </tbody>

            {/* Bu pencereyi bir state'e göre ekrana basacağız */}
            {
                showPopup && (
                    <div className="popup">
                <div className="info">
                    <h2>Silme İşlemini Onaylıyor Musunuz?</h2>
                    <div className="buttons">
                        <button className="btn btn-secondary"
                        onClick={() => setShowPopup(false)}
                        >Hayır</button>
                        <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(deletingId)}
                        >Evet</button>
                    </div>
                </div>
            </div>
                )
            }
        </table>
    )
}

export default UserList ; 