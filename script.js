let liveMatches = [
    {
        id: 1,
        teamA: "India",
        teamB: "England",
        tournament: "T20 World Cup",
        status: "live",
        score: "142/5",
        overs: "15.2 overs",
        result: "India bowled out England for 142"
    },
    {
        id: 2,
        teamA: "Australia",
        teamB: "South Africa",
        tournament: "T20 World Cup",
        status: "live",
        score: "89/3",
        overs: "12 overs",
        result: "Australia chasing 180"
    }
];

const FREE_APIS = {
    sportsrc: 'https://api.sportsrc.org/cricket/schedule',
    embedsportex: 'https://api.embedsportex.site/api',
    venuevault: 'https://venuevault.live/api/schedule/live'
};

const upcomingMatches = [
    {
        id: 3,
        teamA: "Pakistan",
        teamB: "New Zealand",
        tournament: "T20 World Cup",
        date: "2026-06-02",
        time: "19:30 IST"
    },
    {
        id: 4,
        teamA: "India",
        teamB: "Bangladesh",
        tournament: "T20 World Cup",
        date: "2026-06-03",
        time: "15:30 IST"
    },
    {
        id: 5,
        teamA: "England",
        teamB: "West Indies",
        tournament: "T20 World Cup",
        date: "2026-06-04",
        time: "11:00 IST"
    },
    {
        id: 6,
        teamA: "Australia",
        teamB: "Sri Lanka",
        tournament: "T20 World Cup",
        date: "2026-06-05",
        time: "19:30 IST"
    }
];

const ongoingTournaments = [
    {
        name: "T20 World Cup",
        status: "ongoing",
        startDate: "2026-05-20",
        endDate: "2026-06-20",
        matchesPlayed: 12,
        totalMatches: 48,
        description: "ICC Men's T20 World Cup 2026"
    },
    {
        name: "IPL 2026",
        status: "upcoming",
        startDate: "2026-04-09",
        endDate: "2026-05-28",
        matchesPlayed: 74,
        totalMatches: 74,
        description: "Indian Premier League"
    }
];

const countryFlags = {
    India: "https://flagcdn.com/w320/in.png",
    Pakistan: "https://flagcdn.com/w320/pk.png",
    Australia: "https://flagcdn.com/w320/au.png",
    England: "https://flagcdn.com/w320/gb.png",
    "South Africa": "https://flagcdn.com/w320/za.png",
    "New Zealand": "https://flagcdn.com/w320/nz.png",
    "Sri Lanka": "https://flagcdn.com/w320/lk.png",
    "West Indies": "https://flagcdn.com/w320/gd.png",
    Bangladesh: "https://flagcdn.com/w320/bd.png",
    Zimbabwe: "https://flagcdn.com/w320/zw.png",
    Afghanistan: "https://flagcdn.com/w320/af.png"
};

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

async function fetchLiveMatchesFromAPI() {
    try {
        const response = await fetch(FREE_APIS.sportsrc);
        const data = await response.json();
        if (data.matches && data.matches.length > 0) {
            return data.matches.map(m => ({
                id: m.id || Date.now(),
                teamA: m.homeTeam || m.teamA,
                teamB: m.awayTeam || m.teamB,
                tournament: m.league || m.tournament || 'International',
                status: 'live',
                score: m.score || m.result || 'Live',
                overs: m.time || '',
                result: m.status || ''
            }));
        }
    } catch (e) {}
    try {
        const response = await fetch(FREE_APIS.embedsportex);
        const data = await response.json();
        if (data.matches && data.matches.length > 0) {
            return data.matches.map(m => ({
                id: m.id || Date.now(),
                teamA: m.homeTeam,
                teamB: m.awayTeam,
                tournament: m.league,
                status: 'live',
                score: m.score,
                overs: m.time || '',
                result: m.status || ''
            }));
        }
    } catch (e) {}
    return [];
}

function renderStreamingOptions() {
    const streamingSection = document.getElementById('streamingSection');
    if (streamingSection) {
        streamingSection.style.display = 'block';
    }
}

function renderLiveStreams() {
    const container = document.getElementById('streamingContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="match-card live">
            <div class="live-match-header">
                <span class="tournament-name">Free Streams</span>
                <div class="live-indicator">LIVE</div>
            </div>
            <div class="teams">
                <div class="team">
                    <span class="team-name">YouTube Sports</span>
                </div>
                <span class="vs">▶</span>
                <div class="team">
                    <span class="team-name">Watch Now</span>
                </div>
            </div>
            <div class="match-result">
                <a href="https://www.youtube.com/@CricketGateway" target="_blank" style="color:#ff4757;font-weight:bold;">Watch Free ▶</a>
            </div>
        </div>
        <div class="match-card live">
            <div class="live-match-header">
                <span class="tournament-name">Cricbuzz TV</span>
                <div class="live-indicator">LIVE</div>
            </div>
            <div class="teams">
                <div class="team">
                    <span class="team-name">Free Highlights</span>
                </div>
                <span class="vs">▶</span>
                <div class="team">
                    <span class="team-name">Cricbuzz</span>
                </div>
            </div>
            <div class="match-result">
                <a href="https://www.cricbuzz.com" target="_blank" style="color:#2ed573;font-weight:bold;">Visit Site ▶</a>
            </div>
        </div>
        <div class="match-card live">
            <div class="live-match-header">
                <span class="tournament-name">ESPNCricinfo</span>
                <div class="live-indicator">LIVE</div>
            </div>
            <div class="teams">
                <div class="team">
                    <span class="team-name">Official Source</span>
                </div>
                <span class="vs">▶</span>
                <div class="team">
                    <span class="team-name">Watch Now</span>
                </div>
            </div>
            <div class="match-result">
                <a href="https://www.espncricinfo.com" target="_blank" style="color:#2ed573;font-weight:bold;">Watch Free ▶</a>
            </div>
        </div>
    `;
}

async function updateLiveMatches() {
    const apiMatches = await fetchLiveMatchesFromAPI();
    if (apiMatches.length > 0) {
        liveMatches = apiMatches;
    }
}

function renderMatches() {
    const liveContainer = document.getElementById('liveContainer');
    const upcomingContainer = document.getElementById('upcomingContainer');
    
    liveContainer.innerHTML = liveMatches.map(match => `
        <div class="match-card live">
            <div class="live-match-header">
                <span class="tournament-name">${match.tournament}</span>
                <div class="live-indicator">LIVE</div>
            </div>
            <div class="teams">
                <div class="team">
                    <img class="team-logo" src="${countryFlags[match.teamA] || 'https://via.placeholder.com/40'}" alt="${match.teamA}">
                    <span class="team-name">${match.teamA}</span>
                </div>
                <span class="vs">VS</span>
                <div class="team">
                    <img class="team-logo" src="${countryFlags[match.teamB] || 'https://via.placeholder.com/40'}" alt="${match.teamB}">
                    <span class="team-name">${match.teamB}</span>
                </div>
            </div>
            <div class="match-result">
                <span class="live-badge">LIVE</span><br>
                ${match.score}<br>
                ${match.overs}
            </div>
        </div>
    `).join('');

    upcomingContainer.innerHTML = upcomingMatches.map(match => `
        <div class="match-card upcoming">
            <div class="match-header">
                <span class="tournament-name">${match.tournament}</span>
                <span class="match-time">${formatDate(match.date)}, ${match.time}</span>
            </div>
            <div class="teams">
                <div class="team">
                    <img class="team-logo" src="${countryFlags[match.teamA] || ''}" alt="${match.teamA}">
                    <span class="team-name">${match.teamA}</span>
                </div>
                <span class="vs">VS</span>
                <div class="team">
                    <img class="team-logo" src="${countryFlags[match.teamB] || ''}" alt="${match.teamB}">
                    <span class="team-name">${match.teamB}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTournaments() {
    const tournamentsContainer = document.getElementById('tournamentsContainer');
    
    tournamentsContainer.innerHTML = ongoingTournaments.map(tournament => `
        <div class="tournament-card">
            <h3>${tournament.name}</h3>
            <span class="tournament-status">${tournament.status.toUpperCase()}</span>
            <div class="tournament-details">
                <p><strong>Dates:</strong> ${formatDate(tournament.startDate)} - ${formatDate(tournament.endDate)}</p>
                <p><strong>Matches:</strong> ${tournament.matchesPlayed}/${tournament.totalMatches}</p>
                <p>${tournament.description}</p>
            </div>
        </div>
    `).join('');
}

function filterMatches() {
    const selectedCountry = document.getElementById('countryFilter').value;
    const selectedTournament = document.getElementById('tournamentFilter').value;

    const filteredLive = liveMatches.filter(match => {
        const countryMatch = selectedCountry === 'all' || 
            match.teamA === selectedCountry || match.teamB === selectedCountry;
        const tournamentMatch = selectedTournament === 'all' || 
            match.tournament === selectedTournament;
        return countryMatch && tournamentMatch;
    });

    const filteredUpcoming = upcomingMatches.filter(match => {
        const countryMatch = selectedCountry === 'all' || 
            match.teamA === selectedCountry || match.teamB === selectedCountry;
        const tournamentMatch = selectedTournament === 'all' || 
            match.tournament === selectedTournament;
        return countryMatch && tournamentMatch;
    });

    const liveContainer = document.getElementById('liveContainer');
    const upcomingContainer = document.getElementById('upcomingContainer');

    if (filteredLive.length === 0) {
        liveContainer.innerHTML = '<div class="no-matches">No live matches found</div>';
    } else {
        liveContainer.innerHTML = filteredLive.map(match => `
            <div class="match-card live">
                <div class="live-match-header">
                    <span class="tournament-name">${match.tournament}</span>
                    <div class="live-indicator">LIVE</div>
                </div>
                <div class="teams">
                    <div class="team">
                        <img class="team-logo" src="${countryFlags[match.teamA] || 'https://via.placeholder.com/40'}" alt="${match.teamA}">
                        <span class="team-name">${match.teamA}</span>
                    </div>
                    <span class="vs">VS</span>
                    <div class="team">
                        <img class="team-logo" src="${countryFlags[match.teamB] || 'https://via.placeholder.com/40'}" alt="${match.teamB}">
                        <span class="team-name">${match.teamB}</span>
                    </div>
                </div>
                <div class="match-result">
                    <span class="live-badge">LIVE</span><br>
                    ${match.score}<br>
                    ${match.overs}
                </div>
            </div>
        `).join('');
    }

    if (filteredUpcoming.length === 0) {
        upcomingContainer.innerHTML = '<div class="no-matches">No upcoming matches found</div>';
    } else {
        upcomingContainer.innerHTML = filteredUpcoming.map(match => `
            <div class="match-card upcoming">
                <div class="match-header">
                    <span class="tournament-name">${match.tournament}</span>
                    <span class="match-time">${formatDate(match.date)}, ${match.time}</span>
                </div>
                <div class="teams">
                    <div class="team">
                        <img class="team-logo" src="${countryFlags[match.teamA] || ''}" alt="${match.teamA}">
                        <span class="team-name">${match.teamA}</span>
                    </div>
                    <span class="vs">VS</span>
                    <div class="team">
                        <img class="team-logo" src="${countryFlags[match.teamB] || ''}" alt="${match.teamB}">
                        <span class="team-name">${match.teamB}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

document.getElementById('countryFilter').addEventListener('change', filterMatches);
document.getElementById('tournamentFilter').addEventListener('change', filterMatches);

renderMatches();
renderTournaments();
renderStreamingOptions();
renderLiveStreams();
updateLiveMatches();
setInterval(updateLiveMatches, 60000);