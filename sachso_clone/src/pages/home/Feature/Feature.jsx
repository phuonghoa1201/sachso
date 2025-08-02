import aiGradingImg from '../../../assets/aiGradingImg.svg'
import aiPracticeImg from '../../../assets/aiPracticeImg.png'
import teacherManageImg from '../../../assets/teacherManageImg.png'
function Feature() {
    const cards = [
        {
            title: "Chấm điểm AI tự động",
            description: "Việc tích hợp hệ thống AI chấm điểm giúp hạn chế việc lấy đi một khoảng thời gian đáng kể trong khi thời gian đó có thể được sử dụng để trao đổi với học sinh, chuẩn bị trang bị lớp học hay các công việc khác phục vụ thiết yếu phục vụ cho công tác dạy và học.",
            buttons: ["Các bài trắc nghiệm", "Luyện tập với A.I"],
            img: aiGradingImg,
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            textColor: "text-blue-600",
        },
        {
            title: "Giáo viên quản lý học sinh",
            description: "Xây dựng hệ thống quản lý lớp học từ xa. Là nơi giáo viên có thể chủ động theo dõi việc học và làm bài của học sinh từ đó giúp giáo viên có thể quản lý lớp một cách bao quát hơn. Bên cạnh đó luôn đòi hỏi học sinh làm việc khẩn trương theo đúng lộ trình giáo viên đã đặt ra.",
            buttons: ["Quản lý lớp", "Đánh giá kết quả học tập"],
            img: aiPracticeImg,
            buttonColor: "bg-orange-600 hover:bg-orange-700",
            textColor: "text-orange-600",
        },
        {
            title: "Phụ huynh theo dõi học sinh",
            description: "Nhu cầu theo dõi việc học tập của con cái đối với phụ huynh là một nhu cầu hàng đầu. Hệ thống được xây dựng với mục đích đáp ứng nhu cầu trên và tạo sự kết nối chặt chẽ hơn giữa phụ huynh học sinh với nhà trường để kịp thời nắm bắt và theo dõi.",
            buttons: ["Theo dõi kết quả học tập"],
            img: teacherManageImg,
            buttonColor: "bg-purple-600 hover:bg-purple-700",
            textColor: "text-purple-600",
        },

    ];
    return (
        <div className='max-w-screen-li mx-auto px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {cards.map((card, index) => (
                <div className="py-8 bg-white rounded shadow p-4 hover:shadow-lg transition" key={index}>
                    <img className="mx-auto -mt-20  h-30 object-cover mb-4 rounded" src={card.img} />
                    <h3 className={` text-xl font-medium uppercase ${card.textColor} py-4 `}>{card.title}</h3>
                    <p className='text-base font-light text-gray-600'>{card.description}</p>
                    <div className='py-4 flex flex-wrap gap-2 mt-4'>
                        {card.buttons.map((btn, btnIndex) => (
                            <button className={`${card.buttonColor} rounded-full text-white px-3 py-1 rounded transition`} key={btnIndex}>{btn}</button>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
}
export default Feature