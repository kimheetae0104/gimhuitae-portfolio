/* ───────── JANN iPhone Screen Renderers ───────── */

function statusBar(time) {
  return `
    <div class="ds-status">
      <span>${time}</span>
      <div class="right">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="#f4ead8">
          <rect x="0" y="6" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="4" width="3" height="6" rx="0.5"/>
          <rect x="9" y="2" width="3" height="8" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="10" rx="0.5"/>
        </svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" style="margin-left:4px;">
          <rect x="0.5" y="0.5" width="19" height="9" rx="2.5" stroke="#f4ead8" stroke-opacity="0.45"/>
          <rect x="2" y="2" width="14" height="6" rx="1" fill="#f4ead8"/>
        </svg>
      </div>
    </div>`;
}

function renderScreens() {
  /* ── Screen 1 — Splash ── */
  document.getElementById('screen-splash').innerHTML = `
    <div style="width:100%;height:100%;display:flex;flex-direction:column;
                align-items:center;justify-content:center;
                background:radial-gradient(ellipse at 50% 38%,
                  rgba(245,181,86,0.18) 0%,
                  rgba(26,18,10,1) 55%,
                  #0a0603 100%);
                color:#f4ead8;position:relative;">
      <div style="position:absolute;top:46%;width:170px;height:170px;
                  border-radius:50%;border:1px solid rgba(245,181,86,0.18);
                  transform:translateY(-50%);"></div>
      <div style="margin-bottom:60px;filter:drop-shadow(0 0 24px rgba(245,181,86,0.55));">
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          <circle cx="50" cy="14" r="5" stroke="#f5b556" stroke-width="1.6"/>
          <line x1="50" y1="19" x2="50" y2="26" stroke="#f5b556" stroke-width="1.6"/>
          <path d="M14 56 Q14 30 50 30 Q86 30 86 56" stroke="#f5b556" stroke-width="1.8" fill="none"/>
          <ellipse cx="50" cy="56" rx="40" ry="6" stroke="#f5b556" stroke-width="1.6" fill="none"/>
          <ellipse cx="50" cy="56" rx="20" ry="3" stroke="#f5b556" stroke-width="1.2" fill="none" opacity="0.55"/>
          <line x1="6" y1="62" x2="94" y2="62" stroke="#f5b556" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </div>
      <div style="font-family:'Plus Jakarta Sans',sans-serif;font-weight:300;
                  font-size:38px;letter-spacing:0.32em;color:#f4ead8;padding-left:0.32em;">JANN</div>
      <div style="height:1px;width:96px;background:rgba(245,181,86,0.45);margin:14px 0 14px;"></div>
      <div style="font-size:11px;letter-spacing:0.16em;color:rgba(244,234,216,0.6);">재료가 이야기가 되는 순간</div>
      <div style="position:absolute;bottom:36px;font-size:9px;letter-spacing:0.32em;
                  color:rgba(245,181,86,0.4);">— ✦ —</div>
      <div style="position:absolute;bottom:22px;font-size:8px;letter-spacing:0.22em;
                  color:rgba(244,234,216,0.3);">CRAFTED WITH INTELLIGENCE</div>
    </div>
  `;

  /* ── Screen 2 — Home ── */
  document.getElementById('screen-home').innerHTML = `
    <div style="width:100%;height:100%;background:
         linear-gradient(180deg,#1a120a 0%,#0e0805 100%);position:relative;
         overflow:hidden;color:#f4ead8;">
      ${statusBar('9:41')}
      <div style="padding:14px 18px 10px;display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:13px;color:#f5b556;">🍽</span>
            <span style="font-size:20px;font-weight:600;letter-spacing:-0.01em;">Jann</span>
          </div>
          <div style="font-size:10px;color:#b8a98e;margin-top:3px;">안녕하세요, 셰프님 👋</div>
        </div>
        <div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:#b8a98e;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>
          </svg>
        </div>
      </div>
      <div style="margin:6px 14px;background:rgba(255,255,255,0.04);
                  border:1px solid rgba(245,181,86,0.10);border-radius:14px;
                  padding:14px 12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
        ${[['#7ed282','4','식재료'],['#f5b556','0','임박'],['#e57373','0','만료']].map(([c,n,l])=>`
          <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
            <div style="width:16px;height:16px;border-radius:50%;background:${c};opacity:0.18;display:flex;align-items:center;justify-content:center;">
              <div style="width:6px;height:6px;border-radius:50%;background:${c};"></div>
            </div>
            <div style="font-family:'Space Mono',monospace;font-weight:700;font-size:24px;color:#f4ead8;line-height:1;">${n}</div>
            <div style="font-size:9px;color:#8a7d65;">${l}</div>
          </div>
        `).join('')}
      </div>
      <div style="padding:0 18px;margin-top:14px;">
        <div style="font-size:14px;font-weight:600;">오늘의 추천레시피</div>
        <div style="font-size:9px;color:#8a7d65;margin-top:2px;">냉장고 재료로 지금 바로 가능한 요리</div>
      </div>
      <div style="margin:10px 14px 0;background:linear-gradient(180deg,#1a120a 0%,#221610 100%);
                  border:1px solid rgba(245,181,86,0.16);border-radius:14px;
                  padding:10px 10px;display:flex;align-items:center;gap:10px;position:relative;">
        <div style="width:46px;height:46px;border-radius:50%;
                    background:radial-gradient(circle at 35% 30%,#f5b556 0%,#a05a18 70%);
                    display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">🍲</div>
        <div style="flex:1;min-width:0;">
          <div style="display:inline-block;background:rgba(0,0,0,0.5);font-family:'Space Mono',monospace;
                      font-size:8px;letter-spacing:0.1em;padding:2px 5px;border-radius:3px;
                      color:#f5b556;">MENU 1 · GATHERED</div>
          <div style="font-size:11.5px;font-weight:600;margin-top:4px;line-height:1.25;color:#f4ead8;">
            올리브 알라스코라나
          </div>
          <div style="font-size:8.5px;color:#8a7d65;margin-top:3px;">보유 재료 기반 최적 매칭 · 2…</div>
        </div>
      </div>
      <div style="padding:0 18px;margin-top:18px;">
        <div style="font-size:13px;font-weight:600;">냉장고 인사이트</div>
      </div>
      <div style="margin:8px 14px;background:rgba(255,255,255,0.03);
                  border:1px solid rgba(245,181,86,0.08);border-radius:14px;padding:10px;">
        <div style="display:flex;gap:4px;height:5px;border-radius:2px;overflow:hidden;">
          <div style="flex:1;background:#e57373;"></div>
          <div style="flex:1;background:#7ed282;"></div>
          <div style="flex:1;background:#5fa3d6;"></div>
          <div style="flex:2;background:#f5b556;"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;margin-top:9px;
                    font-family:'Space Mono',monospace;font-size:8.5px;color:#b8a98e;">
          <div style="display:flex;justify-content:space-between;"><span><span style="color:#e57373;">●</span> 단백질</span><span>25%</span></div>
          <div style="display:flex;justify-content:space-between;"><span><span style="color:#7ed282;">●</span> 채소류</span><span>25%</span></div>
          <div style="display:flex;justify-content:space-between;"><span><span style="color:#5fa3d6;">●</span> 유제품</span><span>0%</span></div>
          <div style="display:flex;justify-content:space-between;"><span><span style="color:#f5b556;">●</span> 기타</span><span>50%</span></div>
        </div>
      </div>
      <div style="position:absolute;bottom:18px;left:0;right:0;
                  background:rgba(15,10,5,0.85);backdrop-filter:blur(10px);
                  border-top:1px solid rgba(245,181,86,0.12);
                  padding:7px 14px 12px;display:flex;justify-content:space-around;align-items:flex-end;">
        ${[['홈','M3.5 12 12 4l8.5 8M5 10v9h14v-9','#f5b556'],['냉장고','M5 4h14v16H5zM5 12h14M9 8v0','#8a7d65'],[null,null,null],['레시피','M12 3 4 9v12h16V9zM12 3v6','#8a7d65'],['프로필','M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-7 8-7s8 3 8 7','#8a7d65']].map((it,i)=>i===2?`
          <div style="margin-top:-22px;width:46px;height:46px;border-radius:50%;
                      background:#f5b556;display:flex;align-items:center;justify-content:center;
                      box-shadow:0 6px 20px rgba(245,181,86,0.45);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a120a" stroke-width="2">
              <path d="M3 7V5a2 2 0 0 1 2-2h2M21 7V5a2 2 0 0 0-2-2h-2M3 17v2a2 2 0 0 0 2 2h2M21 17v2a2 2 0 0 1-2 2h-2M8 12h8M8 8h8M8 16h8"/>
            </svg>
          </div>
        `:`
          <div style="display:flex;flex-direction:column;align-items:center;gap:3px;color:${it[2]};">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="${it[1]}"/>
            </svg>
            <span style="font-size:8.5px;">${it[0]}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  /* ── Screen 3 — Scan ── */
  document.getElementById('screen-scan').innerHTML = `
    <div style="width:100%;height:100%;background:#0a0603;position:relative;overflow:hidden;color:#f4ead8;">
      <div style="position:absolute;top:0;left:0;right:0;height:48%;
                  background:radial-gradient(ellipse at 50% 50%,
                    rgba(60,90,140,0.45) 0%,
                    rgba(20,30,50,0.85) 70%,
                    rgba(0,0,0,0.95) 100%);"></div>
      ${statusBar('9:41')}
      <div style="padding:6px 18px 10px;display:flex;justify-content:space-between;align-items:center;
                  position:relative;z-index:5;">
        <div style="font-size:16px;font-weight:600;">식재료 스캔</div>
        <div style="width:24px;height:24px;background:rgba(255,255,255,0.12);border-radius:50%;
                    display:flex;align-items:center;justify-content:center;color:#f4ead8;">✕</div>
      </div>
      <div style="margin:6px 14px;height:148px;border-radius:12px;position:relative;
                  background:linear-gradient(180deg,rgba(60,90,140,0.4) 0%,rgba(20,40,80,0.65) 100%);
                  overflow:hidden;">
        ${[['top:8px;left:8px;border-top:2px solid;border-left:2px solid;'],
           ['top:8px;right:8px;border-top:2px solid;border-right:2px solid;'],
           ['bottom:8px;left:8px;border-bottom:2px solid;border-left:2px solid;'],
           ['bottom:8px;right:8px;border-bottom:2px solid;border-right:2px solid;']].map(([s])=>`
          <div style="position:absolute;${s}width:14px;height:14px;border-color:#f5b556;"></div>
        `).join('')}
        <div style="position:absolute;top:62px;right:48px;width:10px;height:10px;border-radius:50%;
                    background:#5fa3d6;box-shadow:0 0 16px #5fa3d6;"></div>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;top:44%;
                  background:rgba(20,15,10,0.92);backdrop-filter:blur(20px);
                  border-radius:18px 18px 0 0;border-top:1px solid rgba(245,181,86,0.14);
                  padding:12px 14px;overflow:hidden;">
        <div style="width:32px;height:3px;background:rgba(245,181,86,0.25);border-radius:2px;
                    margin:0 auto 10px;"></div>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div>
            <div style="font-size:12px;font-weight:600;">인식된 식재료</div>
            <div style="font-size:9px;color:#8a7d65;margin-top:2px;">4종, 총 16개 발견</div>
          </div>
          <div style="display:flex;gap:6px;">
            <div style="font-size:9px;padding:5px 8px;border-radius:14px;
                        background:rgba(255,255,255,0.06);color:#b8a98e;">↻ 다시 스캔</div>
            <div style="font-size:9px;padding:5px 10px;border-radius:14px;font-weight:600;
                        background:#f5b556;color:#1a120a;">전체 추가</div>
          </div>
        </div>
        ${[['🥚','달걀','Egg','10'],['🍅','토마토','Tomato','3'],['🥒','오이','Cucumber','2'],['🥬','Cabbage','Cabbage','1']].map(([emj,ko,en,n])=>`
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(245,181,86,0.10);
                      border-radius:11px;padding:7px 9px;margin-bottom:6px;
                      display:flex;align-items:center;gap:9px;">
            <div style="width:26px;height:26px;border-radius:50%;background:rgba(245,181,86,0.10);
                        display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">${emj}</div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:4px;">
                <span style="font-size:10.5px;font-weight:600;color:#f4ead8;">${ko}</span>
                <span style="font-family:'Space Mono',monospace;font-size:7.5px;
                             background:rgba(245,181,86,0.18);color:#f5b556;
                             padding:1px 4px;border-radius:3px;">${n}개</span>
              </div>
              <div style="font-size:8.5px;color:#8a7d65;">${en}</div>
            </div>
            <div style="font-size:8.5px;padding:4px 8px;border-radius:11px;
                        background:rgba(245,181,86,0.16);color:#f5b556;">✓ 추가됨</div>
          </div>
        `).join('')}
      </div>
      <div style="position:absolute;bottom:14px;left:14px;right:14px;
                  background:#f5b556;color:#1a120a;border-radius:14px;
                  padding:10px;text-align:center;font-size:10px;font-weight:700;
                  box-shadow:0 6px 18px rgba(245,181,86,0.45);">
        ✦ 4종 추가 완료 · AI 레시피 받기
      </div>
    </div>
  `;

  /* ── Screen 4 — Recipe ── */
  document.getElementById('screen-recipe').innerHTML = `
    <div style="width:100%;height:100%;background:#0e0805;color:#f4ead8;
                padding:0;overflow:hidden;position:relative;">
      ${statusBar('9:41')}
      <div style="padding:8px 14px 6px;height:calc(100% - 36px);overflow:hidden;">
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(245,181,86,0.14);
                    border-radius:16px;padding:14px;height:100%;overflow:hidden;
                    position:relative;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <div style="font-size:9px;color:#f5b556;letter-spacing:0.04em;">✦ 생성된 레시피</div>
            <div style="font-size:9px;padding:5px 10px;border-radius:11px;font-weight:600;
                        background:#f5b556;color:#1a120a;">⌐ 저장</div>
          </div>
          <div style="font-size:15px;font-weight:700;line-height:1.2;color:#f4ead8;">
            토마토 에그 샐러드</div>
          <div style="font-size:9.5px;color:#b8a98e;line-height:1.5;margin-top:5px;">
            신선한 재료가 조화를 이루는 간단한 샐러드입니다. 부드러운 계란과 상큼한 토마토가 조화를 이루어 식사로도 좋고 간편한 간식으로도 적합합니다.
          </div>
          <div style="margin-top:9px;padding:8px 9px;border:1px solid rgba(120,140,200,0.22);
                      border-radius:9px;background:rgba(60,80,120,0.10);">
            <div style="display:flex;align-items:center;gap:4px;font-size:9px;font-weight:600;
                        color:#a0b0e0;margin-bottom:3px;">
              <span style="opacity:0.85;">⚛︎</span> Flavor Network 분석
            </div>
            <div style="font-size:8px;color:#9aa3c0;line-height:1.45;">
              계란과 토마토의 조합은 유기산인 리모넨과 에스터인 에틸 아세테이트의 시너지를 통해 상큼하고 부드러운 맛을 만들어냅니다.
            </div>
          </div>
          <div style="height:1px;background:rgba(245,181,86,0.10);margin:9px 0 7px;"></div>
          <div style="font-size:9px;color:#8a7d65;margin-bottom:4px;">필요한 재료</div>
          <div style="font-size:9px;line-height:1.7;color:#d8c9aa;columns:2;column-gap:8px;">
            ${['계란 2개','토마토 1개','오이 1개','양배추 100g','소금 1작은술','후추 약간','올리브유 1큰술','레몬즙 1큰술']
                .map(t=>`<div>• ${t}</div>`).join('')}
          </div>
          <div style="height:1px;background:rgba(245,181,86,0.10);margin:8px 0 6px;"></div>
          <div style="font-size:9px;color:#8a7d65;margin-bottom:5px;">조리 방법</div>
          <div style="font-size:8.5px;line-height:1.45;color:#d8c9aa;">
            ${['계란을 끓는 물에 넣고 10분간 삶아 굳힌 후, 찬물에 담가 식힌다.',
               '삶은 계란의 껍질을 벗기고, 반으로 자른다.',
               '토마토와 오이는 먹기 좋은 크기로 썰고, 양배추는 채 썬다.',
               '모든 재료를 큰 볼에 넣고 소금, 후추, 올리브유,…'
            ].map((t,i)=>`
              <div style="display:flex;gap:6px;margin-bottom:4px;">
                <span style="display:inline-flex;align-items:center;justify-content:center;
                             width:14px;height:14px;border-radius:50%;background:#f5b556;
                             color:#1a120a;font-weight:700;font-size:8px;flex-shrink:0;">${i+1}</span>
                <span>${t}</span>
              </div>
            `).join('')}
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;height:34px;
                      background:linear-gradient(180deg,rgba(14,8,5,0) 0%,rgba(14,8,5,0.95) 100%);
                      pointer-events:none;"></div>
        </div>
      </div>
    </div>
  `;
}
