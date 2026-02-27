import './Ticket.css'

export default function Ticket({fullname,avatarUrl,gitName}) {


    return (
        <div className="ticket">
            <div className="ticket-info">
                <div className="ticket-info__main">
                    <div className="ticket-info__header">
                        <img src="/logo-mark.svg" alt="logo" />
                        <div>
                            <h3>Coding Conf</h3>
                            <p>Jan 31, 2026 / Austin, TX</p>
                        </div>
                    </div>
                    <div className="ticket-info__attendant">
                        <img className="avatar" src={avatarUrl} alt="avatar" />
                        <div>
                            <p className="ticket-info__fullname">{fullname}</p>
                            <div className="gitname-container">
                                <img src="/icon-github.svg" alt="github icon" />
                                <p>{gitName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="ticket-number">#01609</p>
            </div>
            <img className="ticket-pattern" src="/pattern-ticket.svg" alt="pattern ticket" />
        </div>
    )
};