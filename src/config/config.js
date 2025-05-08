export const api = {
    balance: "https://ridho.rcproject.web.id/api/balance",
    history: "https://ridho.rcproject.web.id/api/history",
    logs:`https://ridho.rcproject.web.id`
  };

export const deposite ={
    depo:3000171+4000976+500981+12000579+850719+4500011-2000000
}

export const joinInBtc=1551201000
export const waktuMulai = () => {
    const now = new Date(2025, 3, 25, 0, 0, 0); 
// bulan dihitung dari 0, jadi 3 = April

    const jakarta = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    jakarta.setHours(0, 0, 0, 0); // 00:01 WIB
    return jakarta.getTime();
};