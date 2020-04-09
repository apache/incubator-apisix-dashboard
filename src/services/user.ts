import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  // NOTE: APISIX doesn‘t support user login currently, we return fake data directly.
  return {
    name: 'APISIX User',
    avatar:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxkZWZzPg0KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iaWQwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjI1MTE5LjgiIHkxPSIxMTA1Mi41IiB4Mj0iMjE3MjUuNyIgeTI9IjIxNTUxLjciIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMC4wMjgwOTUsIDAsIDAsIDAuMDI4MDk1LCAtNDkyLjg2NzA5NiwgLTE0NC43Njk4MjEpIj4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0E5MkYzMyIvPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTYyMTI5Ii8+DQogICAgPC9saW5lYXJHcmFkaWVudD4NCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImlkMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNzAyNi42IiB5MT0iODAyMS44IiB4Mj0iMzA1MTQuNiIgeTI9IjE2MjE4LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMC4wMjgwOTUsIDAsIDAsIDAuMDI4MDk1LCAtNDkyLjg2NzA5NiwgLTE0NC43Njk4MjEpIj4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0E5MkYzMyIvPg0KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTg0NDNGIi8+DQogICAgPC9saW5lYXJHcmFkaWVudD4NCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImlkMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyMzA0Ni4xIiB5MT0iMTQzNDAuMiIgeDI9IjI2NzEzLjkiIHkyPSI5OTAwLjA3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuMDI4MDk1LCAwLCAwLCAwLjAyODA5NSwgLTQ5Mi44NjcwOTYsIC0xNDQuNzY5ODIxKSI+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNFNjIxMjkiLz4NCiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0U4NDQzRiIvPg0KICAgIDwvbGluZWFyR3JhZGllbnQ+DQogIDwvZGVmcz4NCiAgPHBhdGggY2xhc3M9ImZpbDEiIGQ9Ik0gMTU2LjAwNSAzMzcuNjQxIEwgMjQ3LjI4NCAyMDUuMjMyIEwgMjE4LjUxNSAxNjAuMTk1IEwgMTM0LjQyOSAyNTkuOTg2IEMgMTM0LjQyOSAyNTkuOTg2IDEzNC40MjkgMjU5Ljk4NiAxMzQuNDI5IDI1OS45ODYgQyAxMzQuNDI5IDI1OS45ODYgMTM0LjQyOSAyNTkuOTg2IDEzNC40MjkgMjU5Ljk4NiBDIDEwNi41MDMgMjkzLjEzOSAxMDIuMDA3IDMwMS4zOTkgNzguNjg5IDM0MC4yODEgTCAxNTYuMDMzIDMzNy42NDEgWiIgc3R5bGU9ImZpbGw6IHVybCgjaWQwKTsiLz4NCiAgPHBhdGggY2xhc3M9ImZpbDIiIGQ9Ik0gMzgyLjYxNiAzNDAuMjgxIEwgNDE5LjYxNiAzNDAuMTQxIEwgMjUzLjMyNSA1MS4xODggTCAyNTMuMzI1IDUxLjE4OCBMIDMzMy42MTkgMzQwLjI4MSBMIDM4Mi42NDQgMzQwLjI4MSBaIE0gMjUzLjI5NyA1MS4xODggTCAyMTEuMjM5IDEyMC42OTQgTCAyMTkuNjk1IDEwNi43MzIgTCAyNTMuMjk3IDUxLjIxNiBaIiBzdHlsZT0iZmlsbDogdXJsKCNpZDEpOyIvPg0KICA8cG9seWdvbiBjbGFzcz0iZmlsMyIgcG9pbnRzPSIyMTguNDg3IDE2MC4xOTUgMzMzLjU5IDM0MC4yODEgMjUzLjI5NyA1MS4xODggMjUzLjI5NyA1MS4xODggMjUzLjI5NyA1MS4xODggMjE5LjcyNCAxMDYuNzAzIDc4LjY2MSAzNDAuMjgxIiBzdHlsZT0iZmlsbDogdXJsKCNpZDIpOyIvPg0KICA8cGF0aCBkPSJNIDExNi4yOTIgMjY2Ljg0OSBMIDExNi4yOTIgMjc4LjI2OSBMIDExMS4yNTIgMjc4LjI2OSBMIDExMS4yNTIgMjc3LjA5OSBDIDExMS4xMTkgMjc3LjM5MiAxMTAuODU1IDI3Ny42NTkgMTEwLjQ2MiAyNzcuODk5IEMgMTEwLjA2MiAyNzguMTQ2IDEwOS43MDIgMjc4LjI2OSAxMDkuMzgyIDI3OC4yNjkgTCA5NS43MzIgMjc4LjI2OSBDIDk1LjM2NSAyNzguMjY5IDk0Ljk5NSAyNzguMTc2IDk0LjYyMiAyNzcuOTg5IEMgOTQuMjQ5IDI3Ny43OTYgOTMuOTQ1IDI3Ny41MjYgOTMuNzEyIDI3Ny4xNzkgQyA5My40NzkgMjc2LjgzOSA5My4zNTkgMjc2LjQ1MiA5My4zNTIgMjc2LjAxOSBDIDkzLjM0NSAyNzUuMTkyIDkzLjMzNSAyNzQuMTQ2IDkzLjMyMiAyNzIuODc5IEMgOTMuMzA5IDI3MS42MTIgOTMuMzAyIDI3MC45NDYgOTMuMzAyIDI3MC44NzkgQyA5My4zMDIgMjY5LjkzMiA5My41NTUgMjY5LjE4OSA5NC4wNjIgMjY4LjY0OSBDIDk0LjU2MiAyNjguMTAyIDk1LjE0OSAyNjcuODI5IDk1LjgyMiAyNjcuODI5IEwgMTA4LjczMiAyNjcuODI5IEMgMTA5LjMzMiAyNjcuODI5IDEwOS44NTIgMjY3Ljk4MiAxMTAuMjkyIDI2OC4yODkgQyAxMTAuNzM5IDI2OC41OTYgMTExLjA1OSAyNjguODk5IDExMS4yNTIgMjY5LjE5OSBMIDExMS4yNTIgMjY3LjY2OSBDIDExMS4yNTIgMjY3LjM0OSAxMTEuMTU5IDI2Ny4wMjIgMTEwLjk3MiAyNjYuNjg5IEMgMTEwLjc3OSAyNjYuMzU2IDExMC41MDUgMjY2LjA3OSAxMTAuMTUyIDI2NS44NTkgQyAxMDkuODA1IDI2NS42NDYgMTA5LjM5NSAyNjUuNTM5IDEwOC45MjIgMjY1LjUzOSBMIDkzLjQ3MiAyNjUuNTM5IEwgOTMuNDcyIDI2MS40NjkgTCAxMTAuODkyIDI2MS40NjkgQyAxMTEuNjI1IDI2MS40NjkgMTEyLjMyMiAyNjEuNjQ5IDExMi45ODIgMjYyLjAwOSBDIDExMy42MzUgMjYyLjM2OSAxMTQuMjEyIDI2Mi44MzYgMTE0LjcxMiAyNjMuNDA5IEMgMTE1LjIxMiAyNjMuOTgyIDExNS42MDIgMjY0LjU3OSAxMTUuODgyIDI2NS4xOTkgQyAxMTYuMTU1IDI2NS44MTIgMTE2LjI5MiAyNjYuMzYyIDExNi4yOTIgMjY2Ljg0OSBaIE0gMTEwLjI5MiAyNzMuMDQ5IEMgMTEwLjI5MiAyNzIuODM2IDExMC4yMTUgMjcyLjY0MiAxMTAuMDYyIDI3Mi40NjkgQyAxMDkuOTAyIDI3Mi4yODkgMTA5LjcwOSAyNzIuMTQ2IDEwOS40ODIgMjcyLjAzOSBDIDEwOS4yNDkgMjcxLjkzOSAxMDkuMDYyIDI3MS44ODkgMTA4LjkyMiAyNzEuODg5IEwgOTkuMzkyIDI3MS44ODkgQyA5OC45NTkgMjcxLjg4OSA5OC42NTUgMjcyLjAzNiA5OC40ODIgMjcyLjMyOSBDIDk4LjMwOSAyNzIuNjI5IDk4LjIyMiAyNzIuODU5IDk4LjIyMiAyNzMuMDE5IEMgOTguMjIyIDI3My4zNjYgOTguMzM1IDI3My42NDYgOTguNTYyIDI3My44NTkgQyA5OC43ODIgMjc0LjA2NiA5OS4wMDUgMjc0LjE2OSA5OS4yMzIgMjc0LjE2OSBMIDEwOS4xOTIgMjc0LjE2OSBDIDEwOS40MTIgMjc0LjE2OSAxMDkuNjUyIDI3NC4wNTYgMTA5LjkxMiAyNzMuODI5IEMgMTEwLjE2NSAyNzMuNTk2IDExMC4yOTIgMjczLjMzNiAxMTAuMjkyIDI3My4wNDkgWk0gMTQwLjE0IDI2NC42ODkgTCAxNDAuMTQgMjY4LjYyOSBDIDE0MC4xNCAyNjkuNTY5IDEzOS45MTMgMjcwLjM2MiAxMzkuNDYgMjcxLjAwOSBDIDEzOS4wMDYgMjcxLjY1NiAxMzguMjUgMjcxLjk3OSAxMzcuMTkgMjcxLjk3OSBMIDEyMy40NCAyNzEuOTc5IEwgMTIzLjQ0IDI3OC4yNjkgTCAxMTguNjEgMjc4LjI2OSBMIDExOC42MSAyNjcuOTI5IEwgMTM0LjMyIDI2Ny45MjkgQyAxMzQuNTI2IDI2Ny45MjkgMTM0LjczNiAyNjcuODA2IDEzNC45NSAyNjcuNTU5IEMgMTM1LjE2MyAyNjcuMzE5IDEzNS4yNyAyNjcuMDQ5IDEzNS4yNyAyNjYuNzQ5IEMgMTM1LjI3IDI2Ni40NjIgMTM1LjE4IDI2Ni4yMjIgMTM1IDI2Ni4wMjkgQyAxMzQuODI2IDI2NS44MjkgMTM0LjU5IDI2NS42ODIgMTM0LjI5IDI2NS41ODkgQyAxMzMuOTk2IDI2NS40OTYgMTMzLjcgMjY1LjQ0OSAxMzMuNCAyNjUuNDQ5IEwgMTE4LjYxIDI2NS40NDkgTCAxMTguNjEgMjYxLjQ2OSBMIDEzNi43MyAyNjEuNDY5IEMgMTM3Ljk5IDI2MS40NjkgMTM4Ljg3MyAyNjEuNzcyIDEzOS4zOCAyNjIuMzc5IEMgMTM5Ljg4NiAyNjIuOTkyIDE0MC4xNCAyNjMuNzYyIDE0MC4xNCAyNjQuNjg5IFpNIDE0Ny41MTIgMjYxLjQ2OSBMIDE0Ny41MTIgMjc4LjI0OSBMIDE0Mi42ODIgMjc4LjI0OSBMIDE0Mi42ODIgMjYxLjQ2OSBMIDE0Ny41MTIgMjYxLjQ2OSBaTSAxNzEuNTc5IDI3MC43NTkgTCAxNzEuNTc5IDI3NS42NzkgQyAxNzEuNTc5IDI3Ni4zODYgMTcxLjM3NiAyNzYuOTk2IDE3MC45NjkgMjc3LjUwOSBDIDE3MC41NTYgMjc4LjAxNiAxNjkuOTc5IDI3OC4yNjkgMTY5LjIzOSAyNzguMjY5IEwgMTQ5Ljc5OSAyNzguMjY5IEwgMTQ5Ljc5OSAyNzQuMTQ5IEwgMTY1LjM4OSAyNzQuMTQ5IEMgMTY1LjY2OSAyNzQuMTQ5IDE2NS45NTkgMjc0LjA0OSAxNjYuMjU5IDI3My44NDkgQyAxNjYuNTY2IDI3My42NDkgMTY2LjcxOSAyNzMuMzQ2IDE2Ni43MTkgMjcyLjkzOSBDIDE2Ni43MTkgMjcyLjcxOSAxNjYuNjU2IDI3Mi41MTIgMTY2LjUyOSAyNzIuMzE5IEMgMTY2LjM5NiAyNzIuMTI2IDE2Ni4yMDMgMjcxLjk2OSAxNjUuOTQ5IDI3MS44NDkgQyAxNjUuNjg5IDI3MS43MzYgMTY1LjQwNiAyNzEuNjc5IDE2NS4wOTkgMjcxLjY3OSBMIDE1My4yOTkgMjcxLjY3OSBDIDE1Mi43MzkgMjcxLjY3OSAxNTIuMjM5IDI3MS41MzYgMTUxLjc5OSAyNzEuMjQ5IEMgMTUxLjM1MyAyNzAuOTYyIDE1MS4wMTMgMjcwLjYyOSAxNTAuNzc5IDI3MC4yNDkgQyAxNTAuNTM5IDI2OS44NjkgMTUwLjQxOSAyNjkuNTU5IDE1MC40MTkgMjY5LjMxOSBMIDE1MC40MTkgMjYzLjg2OSBDIDE1MC40MTkgMjYzLjQwMiAxNTAuNjc5IDI2Mi44ODYgMTUxLjE5OSAyNjIuMzE5IEMgMTUxLjcxOSAyNjEuNzUyIDE1Mi4zODkgMjYxLjQ2OSAxNTMuMjA5IDI2MS40NjkgTCAxNzAuNjY5IDI2MS40NjkgTCAxNzAuNjY5IDI2NS40NDkgTCAxNTYuMjQ5IDI2NS40NDkgQyAxNTUuOTU2IDI2NS40NDkgMTU1LjcxOSAyNjUuNTc2IDE1NS41MzkgMjY1LjgyOSBDIDE1NS4zNTkgMjY2LjA3NiAxNTUuMjY5IDI2Ni4zMzYgMTU1LjI2OSAyNjYuNjA5IEMgMTU1LjI2OSAyNjYuODYyIDE1NS4zOTMgMjY3LjEyOSAxNTUuNjM5IDI2Ny40MDkgQyAxNTUuODg2IDI2Ny42ODkgMTU2LjIzNiAyNjcuODI5IDE1Ni42ODkgMjY3LjgyOSBMIDE2OC41MDkgMjY3LjgyOSBDIDE2OS41NTYgMjY3LjgyOSAxNzAuMzI5IDI2OC4wOTkgMTcwLjgyOSAyNjguNjM5IEMgMTcxLjMyOSAyNjkuMTc5IDE3MS41NzkgMjY5Ljg4NiAxNzEuNTc5IDI3MC43NTkgWk0gMTc5LjI2OCAyNjEuNDY5IEwgMTc5LjI2OCAyNzguMjQ5IEwgMTc0LjQzOCAyNzguMjQ5IEwgMTc0LjQzOCAyNjEuNDY5IEwgMTc5LjI2OCAyNjEuNDY5IFpNIDE5OC4yOTYgMjY5Ljk4OSBMIDIwNi41NjYgMjc4LjI0OSBMIDE5OS44MzYgMjc4LjI0OSBMIDE5My43MzYgMjcxLjk3OSBMIDE4Ny42NjYgMjc4LjI2OSBMIDE4MC44MjYgMjc4LjI2OSBMIDE4OS4xNTYgMjY5LjkxOSBMIDE4MS44MTYgMjYxLjQ4OSBMIDE4Ny43MTYgMjYxLjQ4OSBMIDE5My42MjYgMjY3LjgyOSBMIDE5OS42NjYgMjYxLjQ4OSBMIDIwNS45MjYgMjYxLjQ4OSBMIDE5OC4yOTYgMjY5Ljk4OSBaIiB0cmFuc2Zvcm09Im1hdHJpeCgzLjg3Njk1Nzg5MzM3MTU4MiwgMCwgMCwgMy4zMjAzMTM5MzA1MTE0NzQ2LCAtMzMxLjM5MjM2NDUwMTk1MzEsIC00ODQuMTA5MTMwODU5Mzc1KSIgc3R5bGU9ImZpbGw6IHJnYig1MSwgNTEsIDUxKTsgd2hpdGUtc3BhY2U6IHByZTsiLz4NCjwvc3ZnPg==',
    userid: '00000001',
  };
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
