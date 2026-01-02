import React, { useEffect, useMemo, useState } from "react";

import createCampaignRecomendationIcon from "../../../../assets/icons/create-campaign-recomendation-icon.svg";
import aiImproveBtnIcon from "../../../../assets/icons/ai_improve_btn_icon.svg";
import checkIcon from "../../../../assets/icons/check-icon.svg";

// OJO: según tu requerimiento este icono está en src/assets/icons/oui_generate.svg
// Si aún no existe en tu repo, agrégalo o cambia el import al nombre real.
import ouiGenerateIcon from "../../../../assets/icons/oui_generate.svg";

type Props = {
    open: boolean;
    onClose: () => void;
    onUseBrief: (generatedBrief: string) => void;

    // NUEVO
    initialBrief?: string;
    startAtResult?: boolean;     // si true, abre en el "último paso"
    initialPrompt?: string;      // opcional: para prellenar el prompt si rehace
};

const MIN_PROMPT_LEN = 30; // "texto considerable"

function buildMockBrief(prompt: string) {
    // Aquí luego reemplazas por llamada real a tu backend/IA.
    return [
        "Objetivo Principal",
        "Crear awareness y generar engagement con la audiencia objetivo mediante contenido auténtico y relevante.",
        "",
        "Audiencia",
        "- Edad: 18-35 años",
        "- Intereses: Lifestyle, tendencias, entretenimiento",
        "- Comportamiento: Usuarios activos en redes sociales, buscan contenido genuino",
        "",
        "Estrategia de Contenido",
        "- Formato: Videos cortos (15-60 segundos), posts estáticos, historias",
        "- Tono: Fresco, auténtico y conversacional",
        "- Frecuencia: 3-4 publicaciones por semana",
        "",
        "Mensaje Clave",
        `- Basado en tu descripción: "${prompt.trim()}"`,
        "",
        "Entregables",
        "1. 10 videos cortos para TikTok/Instagram Reels",
        "2. 5 posts estáticos para feed",
        "3. 3 stories diarias durante la campaña",
        "",
        "KPIs",
        "- Alcance, impresiones, engagement rate, CTR, conversiones",
    ].join("\n");
}

export const GenerateBriefModal: React.FC<Props> = ({
                                                        open, onClose, onUseBrief, initialBrief, startAtResult, initialPrompt
                                                    }) => {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // Vista 1: input, Vista 2: resultado
    const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const isValidPrompt = useMemo(() => {
        return prompt.trim().length >= MIN_PROMPT_LEN;
    }, [prompt]);

    const canClickGenerate = isValidPrompt && !isGenerating;

    useEffect(() => {
        if (!open) return;

        // bloquear scroll
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        // Cada vez que ABRE el modal, lo inicializamos según el modo
        setIsGenerating(false);

        if (startAtResult && initialBrief) {
            setGeneratedBrief(initialBrief);
            setIsEditing(true); // abre directo "editando"
            setPrompt(initialPrompt ?? ""); // por si presionan "Rehacer"
        } else {
            setGeneratedBrief(null);
            setIsEditing(false);
            setPrompt(initialPrompt ?? "");
        }
    }, [open, startAtResult, initialBrief, initialPrompt]);

    useEffect(() => {
        if (!open) {
            // reset al cerrar
            setPrompt("");
            setIsGenerating(false);
            setGeneratedBrief(null);
            setIsEditing(false);
        }
    }, [open]);

    if (!open) return null;

    const handleGenerate = async () => {
        if (!isValidPrompt || isGenerating) return;

        setIsGenerating(true);
        setIsEditing(false);

        await new Promise((r) => setTimeout(r, 900));

        const brief = buildMockBrief(prompt);
        setGeneratedBrief(brief);
        setIsGenerating(false);
    };


    const handleRehacer = () => {
        setGeneratedBrief(null);
        setIsEditing(false);
        setIsGenerating(false);
    };

    const handleUse = () => {
        if (!generatedBrief) return;
        onUseBrief(generatedBrief);
    };

    return (
        <div className="ai-brief-modal-overlay" role="dialog" aria-modal="true">
            <div className="ai-brief-modal">
                {/* Header */}
                <div className="ai-brief-modal-header">
                    <div className="ai-brief-modal-titlewrap">
                        <div className="ai-brief-modal-icon">
                            <img
                                src={createCampaignRecomendationIcon}
                                alt="IA"
                                className="ai-brief-modal-icon-img"
                            />
                        </div>

                        <div className="ai-brief-modal-titles">
                            <h3 className="ai-brief-modal-title">
                                {generatedBrief ? "¡Brief generado exitosamente!" : "Generar Brief con IA"}
                            </h3>
                            <p className="ai-brief-modal-subtitle">
                                {generatedBrief
                                    ? "Revisa y edita tu brief generado"
                                    : "Describe tu campaña y la IA creará un Brief Detallado"}
                            </p>
                        </div>
                    </div>

                    <button type="button" className="ai-brief-modal-close" onClick={onClose} aria-label="Cerrar">
                        ×
                    </button>
                </div>

                {/* Body */}
                {!generatedBrief ? (
                    <div className="ai-brief-modal-body">
                        <label className="ai-brief-modal-label">Describe tu campaña</label>

                        <textarea
                            className="ai-brief-modal-textarea"
                            placeholder='Ej: Necesito promocionar mi nuevo producto de tecnología dirigido a (público objetivo) para poder generar (objetivo de campaña)'
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <p className="ai-brief-modal-hint">
                            Incluye el tipo de audiencia, objetivo, tipo de contenido, tono y cualquier detalle importante
                        </p>
                    </div>
                ) : (
                    <div className="ai-brief-modal-body">

                        {/* Toolbar encima del box */}
                        <div className="ai-brief-generated-toolbar">
                            <button
                                type="button"
                                className="ai-brief-modal-edit"
                                onClick={() => setIsEditing(v => !v)}
                            >
                                <span className="ai-brief-modal-edit-icon">☰</span>
                                <span>{isEditing ? "Listo" : "Editar"}</span>
                            </button>
                        </div>

                        <div className={`ai-brief-generated-box ${isEditing ? "is-editing" : ""}`}>
                            {isEditing ? (
                                <textarea
                                    className="ai-brief-generated-editor"
                                    value={generatedBrief}
                                    onChange={(e) => setGeneratedBrief(e.target.value)}
                                />
                            ) : (
                                <pre className="ai-brief-generated-preview">{generatedBrief}</pre>
                            )}
                        </div>


                        <div className="ai-brief-improve-row">
                            <input
                                className="ai-brief-improve-input"
                                placeholder="¿Quieres mejorarlo? (opcional) — Describe aquí tu mejora"
                            />
                            <button type="button" className="ai-brief-improve-btn" aria-label="Mejorar">
                                <img src={aiImproveBtnIcon} alt="" className="ai-brief-improve-btn-icon" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                {!generatedBrief ? (
                    <div className="ai-brief-modal-footer">
                        <button type="button" className="ai-brief-btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className={`ai-brief-btn-primary ${
                                isGenerating ? "is-loading" : (!isValidPrompt ? "is-disabled" : "")
                            }`}
                            onClick={handleGenerate}
                            disabled={!isValidPrompt}  // OJO: solo se deshabilita por inválido, NO por loading
                            aria-busy={isGenerating}
                        >
                            {!isGenerating ? (
                                <>
                                    <img src={ouiGenerateIcon} alt="" className="ai-brief-btn-icon" />
                                    <span>Generar Brief</span>
                                </>
                            ) : (
                                <>
                                    <span className="ai-brief-spinner" />
                                    <span>Generando</span>
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="ai-brief-modal-footer">
                        <button type="button" className="ai-brief-btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="button" className="ai-brief-btn-secondary" onClick={handleRehacer}>
                            Rehacer
                        </button>

                        <button type="button" className="ai-brief-btn-primary" onClick={handleUse}>
                            <img src={checkIcon} alt="" className="ai-brief-btn-icon" />
                            <span>Utilizar Brief</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
