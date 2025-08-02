import { Modal, Form, Input, Select, Upload, Button, Checkbox } from "antd";
import { UploadOutlined, MinusCircleOutlined, PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
function AddQuestion({ openAddQuestion, closeAddQuestion, addQuestion, updateQuestion, editingQuestion }) {
    const [form] = Form.useForm();

    const [audioUrl, setAudioUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        if (editingQuestion) {
            form.setFieldsValue(editingQuestion);
            setAnswersType(editingQuestion.answersType || "text");
            setAnswers(editingQuestion.answers || []);
            setQuestionType(editingQuestion.types || "multiple_choice");
            setAudioUrl(editingQuestion.audios || "");
            setImgUrl(editingQuestion.images || "");
        } else {
            form.resetFields();
            setAnswersType("text");
            setAnswers([{ value: "", isCorrect: null }, { value: "", isCorrect: null }, { value: "", isCorrect: null }]);
            setQuestionType("multiple_choice");
            setAudioUrl("");
            setImgUrl("");
        }
    }, [editingQuestion, form]);

    const onFinish = (values) => {
        const newQuestion = {
            ...values,
            types: questionType,
            answersType: answersType,
            answers: answers,
            audios: audioUrl,
            images: imgUrl
        };
        console.log("New question:", newQuestion);
        if (editingQuestion) {
            updateQuestion(newQuestion);
        } else {
            addQuestion(newQuestion);
        }
        form.resetFields();
        setQuestionType("multiple_choice");
        setAnswersType("text");
        setAnswers([{ value: "", isCorrect: null }, { value: "", isCorrect: null }, { value: "", isCorrect: null }]);
        setAudioUrl("");
        setImgUrl("");
        closeAddQuestion();
    };

    // handle file upload
    const handleAudioFileUpload = (file) => {
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        return false;
    };
    // handle paste link
    const handlePasteLinkAudio = (e) => {
        const val = e.target.value.trim();
        // set to play audio 
        setAudioUrl(val)
    }

    // handle img file upload
    const handleImgFileUpload = (imgFile) => {
        const imgUrl = URL.createObjectURL(imgFile);
        setImgUrl(imgUrl);
        return false;
    }
    // handle paste img link
    const handlePasteImgLink = (img) => {
        const valImg = img.target.value.trim();
        setImgUrl(valImg);
    }

    // state quản lý câu hỏi
    // 2 lọai câu hỏi multiple choice + fill color
    const [questionType, setQuestionType] = useState("multiple_choice")
    // state quản lý câu trả lời text/img
    const [answersType, setAnswersType] = useState('text');


    // state quan ly cau tra lo tuong ứng với 3 đáp án a, b, c,d
    const [answers, setAnswers] = useState([
        { value: "", isCorrect: null },
        { value: "", isCorrect: null },
        { value: "", isCorrect: null }
    ]);

    const onAnswerChange = (index, val) => {
        const newAnswers = [...answers];
        newAnswers[index].value = val;
        setAnswers(newAnswers);
    }

    const addAnwers = () => {
        setAnswers([...answers, { value: "", isCorrect: null }])
    }

    const toggleCorrect = (index, isTrue) => {
        const newAnswers = [...answers]
        newAnswers[index].isCorrect = isTrue
        setAnswers(newAnswers);
    }

    // Save state request
    const [selectedRequest, setSelectedRequest] = useState("");



    return (
        <Modal
            title={editingQuestion ? "CẬP NHẬT CÂU HỎI" : "THÊM CÂU HỎI"}
            centered
            open={openAddQuestion}
            onCancel={closeAddQuestion}
            width="80%"
            footer={null}


        >
            <Form form={form} onFinish={onFinish} layout="vertical" className="space-y-4">
                <div className="max-h-[80vh] overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 space-y-4">
                        <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Khối lớp</span>}
                            name="class"

                        >
                            <Select
                                placeholder="Chọn khối lớp"
                                options={[
                                    { value: 'Lớp 1', label: 'Lớp 1' },
                                    { value: 'Lớp 2', label: 'Lớp 2' },
                                    { value: 'Lớp 3', label: 'Lớp 3' },
                                    { value: 'Lớp 4', label: 'Lớp 4' },
                                    { value: 'Tất cả', label: 'Tất cả' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">unit</span>}
                            name="units"

                        >
                            <Select
                                placeholder="Chọn unit"
                                options={[
                                    { value: 'Unit 1', label: 'Unit 1' },
                                    { value: 'Unit 2', label: 'Unit 2' },
                                    { value: 'Unit 3', label: 'Unit 3' },
                                    { value: 'Unit 4', label: 'Unit 4' },
                                    { value: 'Unit Starter', label: 'Unit Starter' },
                                    { value: 'End of Year', label: 'End of Year' },
                                    { value: 'Tất cả', label: 'Tất cả' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">kỹ năng</span>}
                            name="skills"
                        >
                            <Select
                                placeholder="Chọn kỹ năng"
                                mode="multiple"
                                options={[
                                    { value: "L", label: "L" },
                                    { value: "S", label: "S" },
                                    { value: "W", label: "W" },
                                    { value: "R", label: "R" },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Dạng câu hỏi câu hỏi</span>}
                            name="types"
                        >
                            <Select value={questionType} onChange={setQuestionType}>
                                <Select.Option value="multiple_choice">Multiple Choice</Select.Option>
                                <Select.Option value="fill_color">Fill color</Select.Option>
                            </Select>
                        </Form.Item>
                        {/* {questionType } */}

                        <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Yêu cầu đề bài</span>}
                            name="request"

                        >
                            <Select
                                placeholder="Chọn loại câu hỏi"
                                onChange={(value) => setSelectedRequest(value)}
                                value={selectedRequest}
                                options={[
                                    { value: 'Listen, read and tick the correct anwser.', label: 'Listen, read and tick the correct anwser.' },
                                    { value: 'Look at the picture and write the missing word.', label: 'Look at the picture and write the missing word.' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className=" rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">mức độ nhận thức</span>}
                            name="levels"
                        >
                            <Select
                                placeholder="Chọn mức độ"
                                options={[
                                    { value: 'Thông hiểu', label: 'Thông hiểu' },
                                    { value: 'Vận dụng', label: 'Vận dụng' },
                                    { value: 'Nâng cao', label: 'Nâng cao' },
                                    { value: 'Tất cả', label: 'Tất cả' },
                                ]}
                            />
                        </Form.Item>

                    </div>
                    <div className="md:col-span-2 space-y-4">

                        <Form.Item  label={<span className=" text-blue-900 py-2 px-2 font-semibold">Link audio</span>}
                         name="audios">
                            <div className="flex flex-row">
                                <Input
                                    placeholder="https://..."
                                    value={audioUrl}
                                    onChange={handlePasteLinkAudio}
                                    disabled={selectedRequest === 'Look at the picture and write the missing word.'}

                                />
                                <Upload
                                    beforeUpload={handleAudioFileUpload}
                                    showUploadList={false}
                                    accept="audio/*"

                                >
                                    <Button disabled={audioUrl !== "" || selectedRequest === 'Look at the picture and write the missing word.'} icon={<UploadOutlined />}>Audio Upload</Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        {audioUrl && (
                            <audio controls style={{ marginTop: 8, width: "100%" }}>
                                <source src={audioUrl} />
                                Trình duyệt không hỗ trợ phát audio.
                            </audio>
                        )}
                        <Form.Item label={<span className=" text-blue-900 py-2 px-2 font-semibold">Link hình ảnh</span>}
                         name="images">
                            <div className="flex flex-row">
                                <Input
                                    placeholder="https://..."
                                    value={imgUrl}
                                    onChange={handlePasteImgLink}
                                    disabled={selectedRequest === 'Listen, read and tick the correct anwser.'}

                                />
                                <Upload
                                    beforeUpload={handleImgFileUpload}
                                    showUploadList={false}
                                    accept="image/*"
                                >
                                    <Button disabled={imgUrl !== "" || selectedRequest === 'Listen, read and tick the correct anwser.'} icon={<UploadOutlined />}>Image Upload</Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        {imgUrl && (
                            <img src={imgUrl}
                                alt="Hình ảnh preview"
                                className="block mx-auto mt-2 w-1/3 h-auto max-h-1/3" />

                        )}

                        <Form.Item name="readingContent" label={<span className=" text-blue-900 px-2 font-semibold">Nội dung bài đọc (nếu có)</span>} >
                            <Input.TextArea

                                rows={4}
                                className="p-4 text-base leading-relaxed font-serif rounded-xl border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 shadow-sm"
                            />
                        </Form.Item>

                        {questionType === "multiple_choice" && (
                            <>
                                <div className="p-4 border border-gray-200  shadow-sm bg-white">
                                    <h3 className="border-b border-gray-300 w-full py-2">Câu 1</h3>
                                    <Form.Item label="Loại đáp án là " className="my-2">
                                        <Select value={answersType} onChange={(val) => {
                                            console.log('User chọn answersType:', val);
                                            setAnswersType(val);
                                            // reset after change form
                                            setAnswers([
                                                { value: "" },
                                                { value: "" },
                                                { value: "" },
                                            ])
                                        }}>
                                            <Select.Option value="text">Chữ cái</Select.Option>
                                            <Select.Option value="image">Hình ảnh</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Nhập nội dung câu hỏi"
                                        name="questionText"
                                        className="my-2"

                                    >
                                        <Input.TextArea placeholder="..." rows={1} disabled={selectedRequest === 'Look at the picture and write the missing word.'} />
                                    </Form.Item>

                                    <div className="flex justify-between">
                                        <label>Các đáp án</label>
                                        <label>Đúng/Sai</label>
                                    </div>

                                    {answers.map((ans, index) => (

                                        <Form.Item
                                            key={index}
                                            required
                                            rules={[{ required: true, message: `Vui lòng nhập đáp án ${String.fromCharCode(65 + index)}` }]}
                                        >
                                            <div className="grid grid-cols-[9fr_1fr] items-center gap-4">
                                                {/* Cột 1: chữ cái A, B, C */}
                                                {answersType === 'text' ? (
                                                    <Input
                                                        addonBefore={String.fromCharCode(65 + index) + '.'}
                                                        value={ans.value}
                                                        onChange={(e) => onAnswerChange(index, e.target.value)}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            addonBefore={String.fromCharCode(65 + index) + '.'}
                                                            value={ans.value}
                                                            onChange={(e) => onAnswerChange(index, e.target.value)}
                                                            className="w-full"
                                                        />
                                                        {ans.value && (
                                                            <img

                                                                src={ans.value}
                                                                alt={`Đáp án ${String.fromCharCode(65 + index)}`}
                                                                className="w-28 h-28 object-contain border border-gray-300 rounded"
                                                            />
                                                        )}
                                                    </div>
                                                )}


                                                {/* Cột 3: Checkbox đúng/sai */}
                                                <div className="flex gap-6 justify-center">
                                                    <Checkbox
                                                        checked={ans.isCorrect === true}
                                                        onChange={() => toggleCorrect(index, true)}
                                                    >
                                                    </Checkbox>
                                                    <Button shape="circle"
                                                        type={ans.isCorrect === false ? "danger" : "default"}
                                                        onClick={() => toggleCorrect(index, false)}
                                                        style={{
                                                            borderColor: ans.isCorrect === false ? '#ff4d4f' : undefined
                                                        }}

                                                    >
                                                        <MinusCircleOutlined style={{ color: 'red' }} />
                                                    </Button>
                                                </div>

                                            </div>

                                        </Form.Item>
                                    ))}
                                    <Button type="dashed" onClick={addAnwers} size="small">
                                        <PlusCircleOutlined /> Thêm đáp án
                                    </Button>
                                </div>

                            </>
                        )}
                        <div className="flex justify-end gap-4 mt-4">
                            <Button onClick={closeAddQuestion}>Đóng</Button>
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>

        </Modal >


    );
}
export default AddQuestion;