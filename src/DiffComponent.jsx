import diff_match_patch from 'diff-match-patch';

const DiffComponent = ({ text1, text2 }) => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);

    const renderDiff = (diffs) => {
        return diffs.map((part, index) => {
            const [op, text] = part;
            let style = {
                whiteSpace: 'pre-wrap', // Giữ nguyên xuống dòng và khoảng trắng
            };

            if (op === 1) {
                style = { ...style, backgroundColor: '#e6ffe6' }; // Thêm vào, màu xanh nhạt
            } else if (op === -1) {
                style = { ...style, backgroundColor: '#ffe6e6', textDecoration: 'line-through' }; // Xóa bỏ, màu đỏ nhạt
            }

            return <span key={index} style={style}>{text}</span>;
        });
    };

    return (
        <div>
            {renderDiff(diffs)}
        </div>
    );
};

export default DiffComponent;