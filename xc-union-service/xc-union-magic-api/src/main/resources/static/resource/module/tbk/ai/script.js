document.addEventListener('DOMContentLoaded', function () {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    const questionInput = document.getElementById('question');
    const askButton = document.getElementById('askButton');
    const answerDiv = document.getElementById('answer');

    // 显示内容，隐藏加载动画
    loading.style.display = 'none';
    content.style.display = 'block';

    askButton.addEventListener('click', async function () {
        const question = questionInput.value;
        if (question.trim() === '') {
            return;
        }

        // 显示加载动画
        loading.style.display = 'flex';
        content.style.display = 'none';

        try {
            const response = await fetch('/union/giteeai/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: question })
            });


            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const answer = data.data.content;
                // 使用 marked 库将 Markdown 转换为 HTML
                const html = marked.parse(answer);
                answerDiv.innerHTML = html;
            } else {
                answerDiv.innerHTML = '请求失败，请稍后重试。';
            }
        } catch (error) {
            answerDiv.innerHTML = '发生错误，请检查网络连接。';
        }

        // 隐藏加载动画
        loading.style.display = 'none';
        content.style.display = 'block';
    });
});
