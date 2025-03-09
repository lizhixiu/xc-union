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

        answerDiv.innerHTML = '';

        const eventSource = new EventSource('/union/giteeai/ask?content=' + encodeURIComponent(question));

        eventSource.onmessage = function (event) {
            answerDiv.insertAdjacentHTML('beforeend', event.data);
        };

        eventSource.onerror = function (error) {
            eventSource.close();
        };
    });
});
