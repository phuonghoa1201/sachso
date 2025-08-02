import { Modal } from "antd";
import { useEffect, useState } from "react";

function ViewQuestion({ openViewQuestion, closeViewQuestion, questionData }) {
    const [localAnswers, setLocalAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        if (questionData?.answers) {
            setLocalAnswers(
                questionData.answers.map((ans) => ({
                    ...ans,
                    isCorrect: ans.isCorrect ?? null,
                }))
            );
            setSelectedAnswer(null);
        }
    }, [questionData]);

    const handleSelectAnswer = (idx) => {
        setSelectedAnswer(idx);
    };

    // Hàm kiểm tra link có phải là ảnh không
    const isImageUrl = (url) => {
        if (!url) return false;
        return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
    };


    return (
        <Modal
            title="XEM TRƯỚC"
            centered
            open={openViewQuestion}
            onCancel={closeViewQuestion}
            footer={null}
            width="70%"
        >
            <div className="border-b border-gray-300 py-8 px-4">
                <div className="w-10 h-10 border-gray-900 rounded-full text-black bg-gray-200 flex items-center justify-center font-bold mx-auto">
                    {questionData?.stt}
                </div>
                <div className="mt-2 text-center capitalize">{questionData?.request}</div>
            </div>

            <div className="box shadow px-4 py-8">
                {questionData?.images && (
                    <img
                        src={questionData.images}
                        alt="Hình ảnh câu hỏi"
                        className="block mx-auto mt-4 w-1/4 h-auto max-h-1/3"
                    />
                )}

                {questionData?.audios && (

                    <div className="mt-4">
                        <audio controls style={{ width: "100%" }}>
                            <source src={questionData.audios} />
                            Trình duyệt không hỗ trợ phát audio.
                        </audio>
                        <h3 className="px-4 py-4 ">{questionData?.questionText}</h3>
                    </div>


                )}

                <ul className="flex flex-wrap justify-center items-center gap-2 mt-4 list-none p-0">
                    {localAnswers.map((ans, idx) => {
                        // Lấy link ảnh nếu có tiền tố kiểu "A.link"
                        let imageUrl = ans.value;
                        if (ans.value.includes("http")) {
                            imageUrl = ans.value.substring(ans.value.indexOf("http"));
                        }

                        const showImage =
                            questionData?.answersType === "image" || isImageUrl(imageUrl);

                        const bgClass =
                            selectedAnswer !== null
                                ? idx === selectedAnswer
                                    ? ans.isCorrect
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    : ans.isCorrect
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800";

                        return (
                            <li
                                key={idx}
                                onClick={() => handleSelectAnswer(idx)}
                                className={`p-2 rounded w-40 text-center cursor-pointer shadow ${bgClass}`}
                            >
                                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>

                                {showImage ? (
                                    <img
                                        src={imageUrl}
                                        alt={`Đáp án ${String.fromCharCode(65 + idx)}`}
                                        className="w-28 h-28 object-contain border border-gray-300 rounded mx-auto"
                                    />
                                ) : (
                                    <span>{ans.value}</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Modal>
    );
}

export default ViewQuestion;
