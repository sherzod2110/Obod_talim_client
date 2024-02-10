import "./oneguruh.scss";
import Layout from "../../Layout/Layout";
import person from "../../../img/person.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Oneguruh() {
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  const date = String(today.getDate());
  const [teacher, setTeacher] = useState([]);
  const [guruh, setGuruh] = useState([]);
  const [student, setStudent] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/one/${id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setGuruh(data));
  }, []);
  console.log(guruh.teacher_id);

  useEffect(() => {
    fetch(`http://localhost:2004/guruh/teacher/${guruh.teacher_id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeacher(data));
  }, [guruh]);

  useEffect(() => {
    fetch(`http://localhost:2004/student/guruh/${id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  return (
    <>
      <div className="xisobot">
        <Layout />
        <div style={{ width: "100%" }}>
          <div className="xisobot_box">
            <h2 className="xisobot_box_h2">Guruhlar</h2>
            <p className="xisobot_box_date">
              {date.length === 1 ? "0" + date : date}.
              {month.length === 1 ? "0" + month : month}.{year}
            </p>
            <button className="xisobot_box_btn">Log out</button>
          </div>

          <div className="oneguruh">
            <div>
              {teacher?.teacher?.map((e, i) => {
                return (
                  <li key={i} className="xisobot_flex_list_item2">
                    <div className="xisobot_flex_list_item_box">
                      <p className="xisobot_flex_list_item_box_text">
                        {e.username} {e.familiya}
                      </p>
                      <div style={{ padding: "15px" }}>
                        <img src={person} width={130} alt="person" />
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Ism</p> <span>{e.username}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Yo‘nalishi:</p>{" "}
                          <span>{e.yonalish_id}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Tug’ilgan sana</p>{" "}
                          <span>{e.tugilgan_sana}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Telefon raqam:</p>{" "}
                          <span>{e.raqam}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "7px",
                            marginBottom: "8px",
                          }}
                        >
                          <p className="textt">Ta’lim darajasi</p>{" "}
                          <span>{e.izoh}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              <div className="xisobot_flex_list_item_box box2">
                <div className="box_guruh" key={guruh._id}>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Guruh nomi</p>{" "}
                    <span>{guruh.title}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Ustoz</p>{" "}
                    <span>{guruh.teacher_id}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Dars kunlari</p>{" "}
                    <span>{guruh.kun}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "7px",
                      marginBottom: "8px",
                    }}
                  >
                    <p className="textt">Dars vaqti</p>{" "}
                    <span>{guruh.soat} </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="one_guruh">
              <div className="one_guruh_box">
                <p className="one_guruh_box_text">№</p>
                <p className="one_guruh_box_text2">O'quvchi</p>
                <p className="one_guruh_box_text3">Guruh raqami</p>
              </div>

              <div className="one_guruh_box1">
                {student?.data?.map((e, i) => {
                  return (
                    <div className="one_guruh_box1_box" key={i + 1}>
                      <p className="one_guruh_box1_box_text">{i + 1}</p>
                      <p className="one_guruh_box1_box_text2 one_guruh_box1_box_text4">
                        {e.username}
                      </p>
                      <p className="one_guruh_box1_box_text3 one_guruh_box1_box_text4">
                        {guruh.sequence}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Oneguruh;