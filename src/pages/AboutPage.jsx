import profileImg from '../assets/profile.jpg'; // Import gambar sesuai standar Vite

const AboutPage = () => {
    return (
        <div className="text-center">
            <h3 className="mb-4">About Me</h3>
            <img
                src={profileImg}
                alt="Profile Mas Rijal"
                className="rounded-circle shadow mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '5px solid #0d6efd' }}
            />
            <h4 className="fw-bold">M Rijal Rifai</h4>
            <p className="text-muted">Software Engineer & Team Lead</p>
            <div className="card border-0 bg-light p-3">
                <p className="mb-0">
                    Lagi belajar standarisasi React biar aplikasi yang dibikin
                    punya <strong>95% Scalability</strong> sesuai standar industri!
                </p>
            </div>
        </div>
    );
};

export default AboutPage;