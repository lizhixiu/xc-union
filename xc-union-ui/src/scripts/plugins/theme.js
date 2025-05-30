import global from '@/scripts/global'

export async function setupTheme() {
    let theme = global.themeList.filter(it => it.name === global.selectTheme.name)[0]
    if (theme.style) {
        // 注意变量仅代表一层深的文件名。如果 变量 是 foo/bar，导入将会失败。build之后会有问题，不能直接import(变量)
        await import(`../../styles/theme/style/${theme.style}.less`)
    }
    if (theme.themeOverrides) {
        global.selectTheme.themeOverrides = await import(`../../styles/theme/overrides/${theme.themeOverrides}.json`)
    }
}
