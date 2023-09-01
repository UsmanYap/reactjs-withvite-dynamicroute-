import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Mahasiswa = () => {
  const { npm } = useParams();
  const [datamahasiswa, setMahasiswa] = useState(null);
  const [isFound, setIsFound] = useState(true);

  const getSelectedData = async (npm) => {
    try {
      const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
      const selectedData = res.data.data[0].attributes.prodi[0]
        .filter((data) => data.kode_prodi == npm.slice(4, 6))
        .map((x) => x.mahasiswa)[0]
        .filter((data) => data.tahun_masuk == "20" + npm.slice(0, 2))[0].data;
      setMahasiswa(selectedData);
      setIsFound(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsFound(false);
    }
  };

  useEffect(() => {
    getSelectedData(npm);
  }, [npm]);

  return (
    <div>
      <h1>Data Mahasiswa</h1>
      {datamahasiswa == null ? (
        <div>Loading . . .</div>
      ) : isFound ? ( // Ubah kondisi isFound
        ["pagi", "malam", "cuti"].map((kelas, index) => (
          <div key={index}>
            {datamahasiswa[kelas].map((mahasiswa, index) => (
              <div key={mahasiswa.id || index}>
                {mahasiswa.id === Number(npm.slice(6, 10)) && npm.length === 10 ? (
                  <table>
                    <tbody>
                      <tr>
                        <td>NPM</td>
                        <td>:</td>
                        <td>{npm}</td>
                      </tr>
                      <tr>
                        <td>Nama</td>
                        <td>:</td>
                        <td>{mahasiswa.nama}</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>{mahasiswa.jenis_kelamin === "L" ? "Laki-laki" : mahasiswa.jenis_kelamin === "P" ? "Perempuan" : "Tidak Diketahui"}</td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>{mahasiswa.alamat}</td>
                      </tr>
                      <tr>
                        <td>Hobi</td>
                        <td>:</td>
                        <td>{mahasiswa.hobi.join(", ")}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>Mahasiswa tidak terdata!</div>
      )}
    </div>
  );
};

export default Mahasiswa;
