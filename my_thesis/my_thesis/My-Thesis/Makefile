TARGET=My-Thesis

ifeq ($(OS),Windows_NT)
    SEP = ;
    RM_CMD = del /Q /F
    CLEAN_AUX = del /Q /S *.aux
else
    SEP = :
    RM_CMD = rm -f
    CLEAN_AUX = rm -f */.aux */*.aux
endif

export TEXINPUTS=..$(SEP)
export BIBINPUTS=..$(SEP)

all: $(TARGET).pdf

$(TARGET).pdf: $(TARGET).tex
	@echo "--- Etape 1: Compilation pdflatex ---"
	-pdflatex -interaction=nonstopmode $(TARGET).tex
	@echo "--- Etape 2: Compilation bibtex ---"
	-bibtex $(TARGET)
	@echo "--- Etape 3: Compilation pdflatex (intégration des références) ---"
	-pdflatex -interaction=nonstopmode $(TARGET).tex
	@echo "--- Etape 4: Compilation finale pdflatex ---"
	-pdflatex -interaction=nonstopmode $(TARGET).tex
	@echo "--- Compilation réussie ! ---"
	@echo "--- Nettoyage automatique des fichiers temporaires ---"
	@$(MAKE) clean

fast:
	pdflatex -interaction=nonstopmode $(TARGET).tex

clean:
ifeq ($(OS),Windows_NT)
	-$(RM_CMD) *.aux *.bbl *.blg *.log *.out *.toc *.lof *.lot *.mw
	-$(CLEAN_AUX)
else
	-$(RM_CMD) *.aux *.bbl *.blg *.log *.out *.toc *.lof *.lot *.mw \
	      */.aux */*.aux
endif

distclean: clean
	-$(RM_CMD) $(TARGET).pdf

.PHONY: all clean distclean fast $(TARGET).pdf
